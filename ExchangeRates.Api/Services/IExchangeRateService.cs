using ExchangeRates.Api.Models;

namespace ExchangeRates.Api.Services;

public interface IExchangeRateService
{
    IEnumerable<string> GetSupportedCurrencies();
    Task<IEnumerable<CurrencyRate>> GetExchangeRatesAsync(string baseCurrency);
}
