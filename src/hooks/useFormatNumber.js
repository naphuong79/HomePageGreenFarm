import { useState, useEffect } from 'react';

export const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};

export const useFormatNumber = (num, digits) => {
  const [formattedValue, setFormattedValue] = useState(nFormatter(num, digits));

  useEffect(() => {
    setFormattedValue(nFormatter(num, digits));
  }, [num, digits]);

  return formattedValue;
};

export const useFormatCurrency = (num) => {
  const [formattedValue, setFormattedValue] = useState(num.toLocaleString());

  useEffect(() => {
    setFormattedValue(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num));
  }, [num]);

  return formattedValue;
}

export default useFormatNumber;
