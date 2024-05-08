import { useDerivedValue } from 'react-native-reanimated';
import { formatPrice } from '../../utils';
import { useLineChart } from './useLineChart';
export function useLineChartPrice({
  format,
  precision = 2,
  index
} = {}) {
  const {
    currentIndex,
    data
  } = useLineChart();
  const float = useDerivedValue(() => {
    if ((typeof currentIndex.value === 'undefined' || currentIndex.value === -1) && index == null) return '';
    let price = 0;
    price = data[Math.min(index ?? currentIndex.value, data.length - 1)].value;
    return price.toFixed(precision).toString();
  }, [currentIndex, data, precision]);
  const formatted = useDerivedValue(() => {
    let value = float.value || '';
    const formattedPrice = value ? formatPrice({
      value
    }) : '';
    return format ? format({
      value,
      formatted: formattedPrice
    }) : formattedPrice;
  }, [float, format]);
  return {
    value: float,
    formatted
  };
}
//# sourceMappingURL=usePrice.js.map