import { Coin } from "@/services/coins";

export const format = (value: string | number): string => {
  return String(value).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
};

export const round = (value: number | string): number => {
  return Math.round(Number(value) * 100) / 100;
};

export const getFromATH = (coin: Coin | null | undefined) => {
  if (!coin) return;

  return round(
    ((coin.athPrice.USD - coin.price.USD) / coin.athPrice.USD) * 100
  );
};

export const getToATH = (coin: Coin | null | undefined) => {
  if (!coin) return;

  return round(((coin.athPrice.USD - coin.price.USD) / coin.price.USD) * 100);
};
