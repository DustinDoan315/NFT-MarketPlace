import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import '@walletconnect/react-native-compat';
import {WagmiConfig} from 'wagmi';
import {mainnet, polygon, arbitrum} from 'viem/chains';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  W3mButton,
  Web3Modal,
} from '@web3modal/wagmi-react-native';
import {commonRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'a21f4935aa965b70bd440d5ea8be7fae';

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [mainnet, polygon, arbitrum];

const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true,
  includeWalletIds: [
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
    '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4', // Binance
  ],
});

const HomeViewModal = () => {
  const handleNavigate = () => {
    commonRoot.navigate(router.DETAIL_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Web3Modal />
      <Text>HomeViewModal</Text>

      <W3mButton />
    </View>
  );
};

export default HomeViewModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});
