namespace Microsoft.Extensions.DependencyInjection.CryptoQuotes.GetCryptoQuote;

public sealed class CryptoQuoteDto
{
    public string Symbol { get; init; } = string.Empty;

    public IDictionary<string, decimal> Quotes { get; init; }
        = new Dictionary<string, decimal>();
}
