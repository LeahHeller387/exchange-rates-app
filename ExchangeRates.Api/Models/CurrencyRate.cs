namespace ExchangeRates.Api.Models;

public class CurrencyRate
{
    public string BaseCurrency { get; set; } = string.Empty;
    public string TargetCurrency { get; set; } = string.Empty;
    public decimal Rate { get; set; }
}
