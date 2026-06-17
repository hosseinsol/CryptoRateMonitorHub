using CryptoRateMonitor.Application.Common.Interfaces;
using CryptoRateMonitor.Application.Common.Models;

namespace CryptoRateMonitor.Application.FunctionalTests.CryptoQuotes;

public sealed class TestExchangeRateService : IExchangeRateService
{
    public Task<ExchangeRatesDto> GetRatesAsync(CancellationToken cancellationToken)
    {
        return Task.FromResult(new ExchangeRatesDto
        {
            Success = true,
            Base = "EUR",
            Rates = new Dictionary<string, decimal>
            {
                ["BTC"] = 0.00002m,
                ["USD"] = 1.10m,
                ["GBP"] = 0.85m,
                ["AUD"] = 1.65m,
                ["BRL"] = 5.50m
            }
        });
    }

    public Task<decimal> ConvertAsync(string from, string to, decimal amount, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
