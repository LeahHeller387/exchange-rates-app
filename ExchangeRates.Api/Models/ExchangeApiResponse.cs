namespace ExchangeRates.Api.Models;

public class ExchangeApiResponse
{
    public string? Result { get; set; }

    public string? Base_Code { get; set; }

    public Dictionary<string, decimal>? Rates { get; set; }
}
