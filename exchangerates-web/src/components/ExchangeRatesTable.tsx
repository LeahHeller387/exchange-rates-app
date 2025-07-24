import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TableSortLabel } from '@mui/material';
import { useState } from 'react';
import type { CurrencyRate } from '../../types/exchangeRate.types';

type Props = {
  rates: CurrencyRate[];
};

const ExchangeRatesTable = ({ rates }: Props) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('rate');

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRates = [...rates].sort((a, b) => {
    if (orderBy === 'rate') {
      return order === 'asc' ? a.rate - b.rate : b.rate - a.rate;
    }
    if (orderBy === 'targetCurrency') {
      return order === 'asc' ? a.targetCurrency.localeCompare(b.targetCurrency) : b.targetCurrency.localeCompare(a.targetCurrency);
    }
    return 0;
  });

  return (
    <Box display="flex" justifyContent="center" mt={6}>
      <TableContainer component={Paper} dir="rtl" sx={{ maxWidth: 500 }}>
        <Table dir="rtl">
          <TableHead>
            <TableRow>
              <TableCell>מטבע בסיס</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'targetCurrency'}
                  direction={orderBy === 'targetCurrency' ? order : 'asc'}
                  onClick={() => handleRequestSort('targetCurrency')}
                >
                  מטבע יעד
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'rate'}
                  direction={orderBy === 'rate' ? order : 'asc'}
                  onClick={() => handleRequestSort('rate')}
                >
                  שער חליפין
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRates.map((rate) => (
              <TableRow key={rate.targetCurrency}>
                <TableCell>{rate.baseCurrency}</TableCell>
                <TableCell>{rate.targetCurrency}</TableCell>
                <TableCell>{rate.rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExchangeRatesTable;
