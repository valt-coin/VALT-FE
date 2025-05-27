import { createConfig, cookieStorage, createStorage, http } from "wagmi";
import { bsc, mainnet, arbitrum, sepolia, polygon, bscTestnet } from "wagmi/chains";
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

export const projectId = "eae0f11f6c24655f92e4f531a15f5a7d";

export const ankrApiKey = "25490b55f35399af9ffbed4e3c1cbe629e4a64966aedc0b4c16906704cd82a43";

const metadata = {
  name: "VALT PROJECT",
  description: "VALT PROJECT",
  url: "https://valt.pro",
  icons: ["https://valt.pro/assets/img/Logo.png"],
};

const chains = [mainnet, bsc, bscTestnet, polygon] as const;

export const config = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(`https://rpc.ankr.com/eth/${ankrApiKey}`),
    // [arbitrum.id]: http(),
    [bsc.id]: http(`https://rpc.ankr.com/bsc/${ankrApiKey}`),
    [polygon.id]: http(`https://rpc.ankr.com/polygon/${ankrApiKey}`),
    [bscTestnet.id]: http(`https://bsc-Mainnet-rpc.publicnode.com`),
    // [sepolia.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({ projectId, metadata }),
    coinbaseWallet({ appName: metadata.name }),
  ],
  ssr: false,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
