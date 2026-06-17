using Microsoft.Extensions.DependencyInjection.CryptoQuotes.GetCryptoQuote;

namespace CryptoRateMonitor.Web.Endpoints;

public class CryptoQuotes : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetQuote, "{symbol}");
    }

    public async Task<CryptoQuoteDto> GetQuote(
        ISender sender,
        string symbol)
    {
        return await sender.Send(
            new GetCryptoQuoteQuery(symbol));
    }
}
