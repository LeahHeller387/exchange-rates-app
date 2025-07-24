using ExchangeRates.Api.Constants;
using ExchangeRates.Api.Models;

namespace ExchangeRates.Api.Services;

public class ExchangeRateService : IExchangeRateService
{
    private readonly HttpClient _httpClient;

    public ExchangeRateService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public IEnumerable<string> GetSupportedCurrencies() => SupportedCurrencies.List;

    public async Task<IEnumerable<CurrencyRate>> GetExchangeRatesAsync(string baseCurrency)
    {
        baseCurrency = baseCurrency.ToUpper();

        if (!SupportedCurrencies.List.Contains(baseCurrency))
            throw new ArgumentException("Unsupported base currency");

        var url = $"https://open.er-api.com/v6/latest/{baseCurrency}";
        var result = await _httpClient.GetFromJsonAsync<ExchangeApiResponse>(url);

        if (result?.Rates == null)
            throw new Exception("Failed to fetch exchange rates");

        return result.Rates
            .Where(kvp => kvp.Key != baseCurrency && SupportedCurrencies.List.Contains(kvp.Key))
            .Select(kvp => new CurrencyRate
            {
                BaseCurrency = baseCurrency,
                TargetCurrency = kvp.Key,
                Rate = kvp.Value
            });
    }
}
