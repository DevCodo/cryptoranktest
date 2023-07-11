import { API_KEY, API_URL } from ".";

interface CurrenciesResponse {
  data: Currence[];
}

export interface Currence {
  id: number;
  symbol: string;
  name: string;
  slug: string;
  category: string;
  circulatingSupply: number;
  values: {
    USD: {
      price: number;
    };
  };
}

export async function getCurrencies(
  limit: number
): Promise<CurrenciesResponse> {
  const response = await fetch(
    `${API_URL}/v1/currencies?limit=${limit}&api_key=${API_KEY}`
  );

  return await response.json();
}
