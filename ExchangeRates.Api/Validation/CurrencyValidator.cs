using ExchangeRates.Api.Constants;

namespace ExchangeRates.Api.Validation
{
    public static class CurrencyValidator
    {
        public static bool IsValid(string? currency) =>
            !string.IsNullOrWhiteSpace(currency) &&
            SupportedCurrencies.List.Contains(currency.ToUpper());
    }
}
