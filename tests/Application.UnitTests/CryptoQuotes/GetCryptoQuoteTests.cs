using CryptoRateMonitor.Application.Common.Interfaces;
using CryptoRateMonitor.Application.Common.Models;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection.CryptoQuotes.GetCryptoQuote;
using NUnit.Framework;

namespace CryptoRateMonitor.Application.UnitTests.CryptoQuotes;

public class GetCryptoQuoteTests
{
    [Test]
    public void ValidatorAcceptsSupportedSymbolFormat()
    {
        var validator = new GetCryptoQuoteQueryValidator();

        var result = validator.Validate(new GetCryptoQuoteQuery("BTC"));

        result.IsValid.Should().BeTrue();
    }

    [Test]
    public void ValidatorRejectsCommaSeparatedSymbols()
    {
        var validator = new GetCryptoQuoteQueryValidator();

        var result = validator.Validate(new GetCryptoQuoteQuery("BT,C"));

        result.IsValid.Should().BeFalse();
    }

    [Test]
    public async Task HandlerReturnsRoundedFiatQuotesForSymbol()
    {
        var handler = new GetCryptoQuoteQueryHandler(new StubExchangeRateService());

        var result = await handler.Handle(new GetCryptoQuoteQuery("btc"), CancellationToken.None);

        result.Symbol.Should().Be("BTC");
        result.Quotes.Should().BeEquivalentTo(new Dictionary<string, decimal>
        {
            ["EUR"] = 50000.00m,
            ["USD"] = 55000.00m,
            ["GBP"] = 42500.00m,
            ["AUD"] = 82500.00m,
            ["BRL"] = 275000.00m
        });
    }

    private sealed class StubExchangeRateService : IExchangeRateService
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
}
