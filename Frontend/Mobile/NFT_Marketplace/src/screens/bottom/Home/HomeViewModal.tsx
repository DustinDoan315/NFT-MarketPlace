/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FakeListAssets} from '@utils/fake';
import {width} from '@utils/response';
import {formatPrice} from '@utils/helper';
import {icons} from '@assets/index';

export const ListAssets = () => {
  const _renderItem = ({item}: any) => {
    return (
      <View style={styles.assetItem} key={item?.id.toString()}>
        <Image
          style={styles.assetItemImage}
          source={item?.img}
          resizeMode="stretch"
        />
        <View style={styles.tokenName}>
          <Text style={{marginBottom: 3}}>{item?.name}</Text>
          <Text>{item?.token}</Text>
        </View>

        <View style={styles.tokenPrice}>
          <Text style={{marginBottom: 3}}>{formatPrice(item?.price)}</Text>
          <Text
            style={[
              {
                color: item?.profit > 0 ? 'green' : 'red',
              },
            ]}>
            {`${item?.profit > 0 ? '+' + item?.profit : item?.profit}`}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.listAssetContainer}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 7,
        }}>
        {'Assets'}
      </Text>
      <FlatList data={FakeListAssets} renderItem={_renderItem} />
    </View>
  );
};

export const MyWallet = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{marginRight: 5, color: 'gray'}}>My Wallet</Text>
        <View
          style={{
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4F5F8',
          }}>
          <Text
            style={{
              color: 'gray',
            }}>
            0xbB...285
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginVertical: 5}}>
          {formatPrice(54292.79)}
        </Text>

        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 7,
            borderRadius: 100,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 12, color: 'white', fontWeight: '500'}}>
            {'+5.21'}%
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 7,
        }}>
        <TouchableOpacity
          style={{
            width: '46%',
            paddingVertical: 10,
            paddingHorizontal: 7,
            borderRadius: 100,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: 15,
          }}>
          <Image
            style={{
              width: 24,
              height: 24,
              marginRight: 5,
            }}
            resizeMode="cover"
            source={icons.send}
          />
          <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
            Send
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '46%',
            paddingVertical: 10,
            paddingHorizontal: 7,
            borderRadius: 100,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: 24,
              height: 24,
              marginRight: 5,
            }}
            resizeMode="cover"
            source={icons.qr_code}
          />
          <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
            Receive
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  listAssetContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  assetItem: {
    width: width,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginVertical: 5,
  },
  assetItemImage: {
    width: 48,
    height: '100%',
    marginTop: 7,
  },
  tokenName: {
    marginHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
  },
  tokenPrice: {
    position: 'absolute',
    right: 32,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
