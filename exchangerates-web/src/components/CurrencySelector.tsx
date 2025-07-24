import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Props = {
  currencies: string[];
  selected: string;
  onChange: (value: string) => void;
};

const CurrencySelector = ({ currencies, selected, onChange }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="currency-label" dir="rtl">בחר מטבע בסיס</InputLabel>
      <Select 
        labelId="currency-label"
        value={selected}
        label="בחר מטבע בסיס"
        onChange={(e) => onChange(e.target.value)}
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
