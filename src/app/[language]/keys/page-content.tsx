'use client';

import Typography from '@mui/material/Typography'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'

// 1. Get projectId
const projectId = 'YOUR_PROJECT_ID'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }: React.PropsWithChildren<{}>) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

function WalletPage() {
    return <>
    <Typography variant='h2'>
        Connect Wallet
    </Typography>
    <Web3Modal>
        <Typography variant='h3'>
            Connected
        </Typography>
    </Web3Modal>
    </>;
  }

export default WalletPage