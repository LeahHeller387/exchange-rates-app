import { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import CurrencySelector from '../components/CurrencySelector';
import ExchangeRatesTable from '../components/ExchangeRatesTable';
import type { CurrencyRate } from '../../types/exchangeRate.types';
import axios from 'axios';

const ExchangeRatesPage = () => {
    const [baseCurrency, setBaseCurrency] = useState<string>(''); // ערך התחלתי ריק
    const [rates, setRates] = useState<CurrencyRate[]>([]);
    const [currencies, setCurrencies] = useState<string[]>([]);  // הוספת state למטבעות
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // בקשה ראשונית - לקבלת המטבעות בלבד
    useEffect(() => {
        const fetchCurrencies = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get<string[]>('http://localhost:5227/api/ExchangeRates/currencies');
                setCurrencies(response.data);  // עדכון המטבעות הנתמכים
            } catch (err) {
                setError('אירעה שגיאה בעת טעינת המטבעות.');
            } finally {
                setLoading(false);
            }
        };

        fetchCurrencies();
    }, []);  // הבקשה תתבצע פעם אחת בלבד

    // בקשה לטעינת שערי החליפין למטבע שנבחר (לא מתבצע בשלב הראשון)
    useEffect(() => {
        if (!baseCurrency) return;  // אם לא נבחר מטבע
        const fetchRates = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get<CurrencyRate[]>(`http://localhost:5227/api/ExchangeRates/rates/${baseCurrency}`);
                setRates(response.data);  // עדכון שערי החליפין
            } catch (err) {
                setError('אירעה שגיאה בעת טעינת שערי החליפין.');
            } finally {
                setLoading(false);
            }
        };

        fetchRates();  // טוען את שערי החליפין רק כאשר המטבע הבסיסי משתנה
    }, [baseCurrency]);  // הבקשה תתבצע רק כאשר המטבע הבסיסי משתנה

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
                        currencies={currencies}  // שליחת המטבעות הנתמכים
                    />
                </Box>

                {loading && <CircularProgress sx={{ mt: 4 }} />}
                {error && <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>}

                {/* הצגת הטבלה רק כאשר נבחר מטבע בסיס */}
                {baseCurrency && !loading && !error && <ExchangeRatesTable rates={rates} />}
            </Box>
        </Container>
    );
};

export default ExchangeRatesPage;
