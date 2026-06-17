using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection.CryptoQuotes.GetCryptoQuote;

namespace CryptoRateMonitor.Application.FunctionalTests.CryptoQuotes;

using static Testing;

public class GetCryptoQuoteEndpointTests : BaseTestFixture
{
    [Test]
    public async Task GetQuoteReturnsFiatQuotesForBitcoin()
    {
        var client = CreateClient();

        var quote = await client.GetFromJsonAsync<CryptoQuoteDto>("/api/CryptoQuotes/BTC");

        quote.Should().NotBeNull();
        quote!.Symbol.Should().Be("BTC");
        quote.Quotes.Should().BeEquivalentTo(new Dictionary<string, decimal>
        {
            ["EUR"] = 50000.00m,
            ["USD"] = 55000.00m,
            ["GBP"] = 42500.00m,
            ["AUD"] = 82500.00m,
            ["BRL"] = 275000.00m
        });
    }

    [Test]
    public async Task GetQuoteNormalizesLowerCaseSymbol()
    {
        var client = CreateClient();

        var quote = await client.GetFromJsonAsync<CryptoQuoteDto>("/api/CryptoQuotes/btc");

        quote.Should().NotBeNull();
        quote!.Symbol.Should().Be("BTC");
    }

    [Test]
    public async Task GetQuoteReturnsBadRequestForUnsupportedSymbol()
    {
        var client = CreateClient();

        var response = await client.GetAsync("/api/CryptoQuotes/ETH");

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        var problem = await response.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        problem.Should().NotBeNull();
        problem!.Errors.Should().ContainKey("Symbol");
    }
}
