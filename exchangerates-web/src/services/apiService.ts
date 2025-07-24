import axios from 'axios';
import type { CurrencyRate } from '../../types/exchangeRate.types';

const API_BASE_URL = 'http://localhost:5227/api/ExchangeRates';

export const getCurrencies = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${API_BASE_URL}/currencies`);
  return response.data;
};

export const getExchangeRates = async (baseCurrency: string): Promise<CurrencyRate[]> => {
  const response = await axios.get<CurrencyRate[]>(`${API_BASE_URL}/rates/${baseCurrency}`);
  return response.data;
};
