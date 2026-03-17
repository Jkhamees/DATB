import { createAppKit, useAppKitTheme } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin';
import { TonAdapter } from '@reown/appkit-adapter-ton';
import { mainnet, arbitrum, polygon, optimism, base } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { defineChain } from '@reown/appkit/networks';
import { useEffect } from 'react';
import { useTheme } from './ThemeContext';

// 1. Get projectId from https://cloud.reown.com
export const projectId = (import.meta as any).env?.VITE_PROJECT_ID || 'fea24b9a023abb603aa56ec0cd6088ee'; // User provided ID

// 2. Define standard networks
export const networks = [mainnet, arbitrum, polygon, optimism, base] as any;

// 3. Define custom network as requested
export const customNetwork = defineChain({
  id: 123456789,
  caipNetworkId: 'eip155:123456789',
  chainNamespace: 'eip155',
  name: 'Custom Network',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://your.custom.rpc.url'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'BLOCK_EXPLORER_URL' },
  },
}) as any;

// 4. Create adapters
const wagmiAdapter = new WagmiAdapter({
  networks: [...networks, customNetwork] as any,
  projectId,
  ssr: true
});

const solanaAdapter = new SolanaAdapter({
  wallets: [] // Add solana wallets if needed
});

const bitcoinAdapter = new BitcoinAdapter({
  projectId
});

const tonAdapter = new TonAdapter();

// 5. Create modal
const appkit = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter, bitcoinAdapter, tonAdapter],
  networks: [...networks, customNetwork] as any,
  projectId,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#3b82f6',
    '--w3m-color-mix-strength': 40,
    '--w3m-accent': '#3b82f6',
  },
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'x', 'github', 'discord', 'apple'],
    emailShowWallets: true,
  },
  chainImages: {
    123456789: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', // Placeholder logo
  }
});

const queryClient = new QueryClient();

function ThemeSync() {
  const { theme } = useTheme();
  const { setThemeMode } = useAppKitTheme();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

  return null;
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeSync />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
