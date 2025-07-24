import { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import CurrencySelector from '../components/CurrencySelector';
import ExchangeRatesTable from '../components/ExchangeRatesTable';
import type { CurrencyRate } from '../../types/exchangeRate.types';
import { getCurrencies, getExchangeRates } from '../services/apiService';

const ExchangeRatesPage = () => {
  const [baseCurrency, setBaseCurrency] = useState('');
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadCurrencies = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCurrencies();
      setCurrencies(data);
    } catch {
      setError('אירעה שגיאה בעת טעינת המטבעות.');
    } finally {
      setLoading(false);
    }
  };

  const loadRates = async (currency: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await getExchangeRates(currency);
      setRates(data);
    } catch {
      setError('אירעה שגיאה בעת טעינת שערי החליפין.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrencies();
  }, []);

  useEffect(() => {
    if (baseCurrency) {
      loadRates(baseCurrency);
    }
  }, [baseCurrency]);

  return (
    <Container>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 16 }}>
          <Typography variant="h4">שערי חליפין</Typography>
        </Box>

        <Box sx={{ maxWidth: 300, mx: 'auto', mt: 3 }}>
          <CurrencySelector
            selected={baseCurrency}
            onChange={setBaseCurrency}
            currencies={currencies}
          />
        </Box>

        {loading && <CircularProgress sx={{ mt: 4 }} />}
        {error && <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>}

        {!loading && !error && baseCurrency && (
          <>
            {rates.length > 0 ? (
              <ExchangeRatesTable rates={rates} />
            ) : (
              <Typography sx={{ mt: 4 }}>
                לא נמצאו שערים זמינים עבור המטבע הנבחר.
              </Typography>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default ExchangeRatesPage;
