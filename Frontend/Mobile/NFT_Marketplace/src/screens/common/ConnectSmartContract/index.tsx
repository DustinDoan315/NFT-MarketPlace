import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Header from '@components/Header';
import {useAccount, useContractRead} from 'wagmi';
import {Button} from '@web3modal/ui-react-native';
// import marketplace from '../../../ContractsData/Marketplace.json';
import RequestModal from '@components/RequestModal';
// import marketplaceAddr from '../../../ContractsData/Marketplace-address.json';
const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_feePercent',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'ReentrancyGuardReentrantCall',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'nft',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
    ],
    name: 'Bought',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'nft',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
    ],
    name: 'Offered',
    type: 'event',
  },
  {
    inputs: [],
    name: 'feeAccount',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feePercent',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
    ],
    name: 'getTotalPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'itemCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'items',
    outputs: [
      {
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC721',
        name: 'nft',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'seller',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'sold',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC721',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
    ],
    name: 'makeNewItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
    ],
    name: 'purchaseItem',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];
const ConnectSmartContract = () => {
  const [requestModalVisible, setRequetsModalVisible] = useState(false);
  const {isConnected} = useAccount();

  const {data, isError, isLoading, isSuccess} = useContractRead({
    address: '0xa5915c477b8cC7d000b57476e40E53B9dc56E470',
    abi: abi,
    functionName: 'feeAccount',
    enabled: requestModalVisible,
  });
  console.log('====================================');
  console.log(data);
  console.log(isError);
  console.log(isLoading);
  console.log(isSuccess);
  console.log(isConnected);
  console.log(useAccount());
  console.log('====================================');

  const onPress = () => {
    setRequetsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header />
      {!isConnected && (
        <View>
          <Button disabled={isLoading} onPress={onPress}>
            Read contract
          </Button>

          <RequestModal
            isVisible={requestModalVisible}
            isLoading={isLoading}
            rpcResponse={isSuccess ? data?.toString() : undefined}
            rpcError={isError ? 'Error reading contract' : undefined}
            onClose={() => setRequetsModalVisible(false)}
          />
        </View>
      )}
    </View>
  );
};

export default ConnectSmartContract;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});
