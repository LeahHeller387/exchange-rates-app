using ExchangeRates.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExchangeRates.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExchangeRatesController : ControllerBase
{
    private readonly IExchangeRateService _exchangeRateService;

    public ExchangeRatesController(IExchangeRateService exchangeRateService)
    {
        _exchangeRateService = exchangeRateService;
    }

    [HttpGet("currencies")]
    public IActionResult GetCurrencies()
    {
        var currencies = _exchangeRateService.GetSupportedCurrencies();
        return Ok(currencies);
    }

    [HttpGet("rates/{baseCurrency}")]
    public async Task<IActionResult> GetRates(string baseCurrency)
    {
        try
        {
            var rates = await _exchangeRateService.GetExchangeRatesAsync(baseCurrency);
            return Ok(rates);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch
        {
            return StatusCode(500, "Failed to retrieve exchange rates.");
        }
    }
}
