export const numberFormat = (number: number | string) =>
  new Intl.NumberFormat().format(Number(number));

export const showSortAddress = (address: string) => {
  return `${address?.substring(0, 3)} ... ${address.substring(
    address.length - 3,
    address.length
  )}`;
};
