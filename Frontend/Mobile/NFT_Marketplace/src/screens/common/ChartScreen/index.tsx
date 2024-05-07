/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {root} from '@navigation/NavigationRef';
import {CandlestickChart, LineChart} from 'react-native-wagmi-charts';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChartScreen = ({route}: any) => {
  const [switchChartMode, setSwitchChartMode] = useState<string>('candle');
  const [coinPrice, setCoinPrice] = useState<any>([]);
  const [visibleData, setVisibleData] = useState(coinPrice.slice(0, 10));
  const [number, setNumber] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleItems, setVisibleItems] = React.useState<number[]>([]);

  useEffect(() => {
    fetchBTCPrice();
  }, []);
  useEffect(() => {
    setVisibleData(coinPrice.slice(0, 10));
  }, [coinPrice]);

  // const loadMoreData = () => {
  //   if (!isLoading) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       const nextItems = coinPrice.slice(number, number + 2);
  //       setNumber(number + 2);
  //       setVisibleData((prevData: any) => [...prevData.slice(2), ...nextItems]);
  //       setIsLoading(false);
  //     }, 500);
  //   }
  // };
  const ITEM_WIDTH = 20;

  const handleScroll = (event: any) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const startIndex = Math.floor(contentOffset.x / ITEM_WIDTH);
    const endIndex = Math.ceil(
      (contentOffset.x + layoutMeasurement.width) / ITEM_WIDTH,
    );
    const visibleIndexes = Array.from(
      {length: endIndex - startIndex},
      (_, i) => i + startIndex,
    );

    setVisibleItems(visibleIndexes);
  };

  const fetchBTCPrice = async () => {
    try {
      const response = await axios.get(
        'https://testnet.binance.vision/api/v3/klines',
        {
          params: {
            symbol: 'BTCUSDT',
            interval: '1h',
            limit: 100,
          },
        },
      );
      const btcPrice = response.data;
      const formattedData = btcPrice.map((entry: any) => ({
        timestamp: Number(entry[0]),
        open: parseFloat(entry[1]),
        high: parseFloat(entry[2]),
        low: parseFloat(entry[4]),
        close: parseFloat(entry[4]),
        value: (+entry[1] + +entry[4]) / 2,
      }));
      setCoinPrice(formattedData);
      console.log('BTC Price:', formattedData);
      return btcPrice;
    } catch (error: any) {
      console.error('Error fetching BTC price:', error.message);
      throw error;
    }
  };

  const goBack = () => {
    root.goBack();
  };

  const switchChart = () => {
    setSwitchChartMode(switchChartMode === 'line' ? 'candle' : 'line');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Pressable onPress={goBack}>
          <Text>Go back</Text>
        </Pressable>

        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
          }}
          onPress={switchChart}>
          <Text style={{color: 'white'}}>
            Switch to {switchChartMode === 'line' ? 'Candle' : 'Line'} Chart
          </Text>
        </Pressable>

        <ScrollView
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}>
          {switchChartMode === 'line' ? (
            <LineChart.Provider data={coinPrice}>
              <LineChart>
                <LineChart.Path color="red">
                  <LineChart.Gradient color={'red'} />
                  <LineChart.Highlight color="green" from={1} to={2} />
                </LineChart.Path>
                <LineChart.CursorCrosshair>
                  <LineChart.Tooltip
                    style={{
                      backgroundColor: 'white',
                    }}
                  />
                </LineChart.CursorCrosshair>
              </LineChart>
            </LineChart.Provider>
          ) : (
            <CandlestickChart.Provider
              data={coinPrice}
              dataDomain={coinPrice.slice(
                visibleItems?.[0],
                visibleItems?.[visibleItems.length - 1],
              )}>
              <CandlestickChart width={coinPrice.length * 20}>
                <CandlestickChart.Candles />

                {/* <CandlestickChart.Crosshair color={'green'}>
                  <CandlestickChart.Tooltip />
                </CandlestickChart.Crosshair> */}
              </CandlestickChart>
              {/* <CandlestickChart.PriceText type="open" />
              <CandlestickChart.PriceText type="high" />
              <CandlestickChart.PriceText type="low" />
              <CandlestickChart.PriceText type="close" />
              <CandlestickChart.DatetimeText /> */}
            </CandlestickChart.Provider>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
