import { API_URL } from ".";

interface CoinResponse {
  data: Coin;
}

export interface Coin {
  name: string;
  athPrice: {
    USD: number;
  };
  price: {
    USD: number;
  };
}

export async function getCoin(slug: string): Promise<CoinResponse> {
  const response = await fetch(`${API_URL}/v0/coins/${slug}`);

  return await response.json();
}
