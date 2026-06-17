using CryptoRateMonitor.Application.Common.Interfaces;
using FluentValidation.Results;
using ApplicationValidationException = CryptoRateMonitor.Application.Common.Exceptions.ValidationException;

namespace Microsoft.Extensions.DependencyInjection.CryptoQuotes.GetCryptoQuote;

public sealed record GetCryptoQuoteQuery(string Symbol)
    : IRequest<CryptoQuoteDto>;

public sealed class GetCryptoQuoteQueryHandler(IExchangeRateService exchangeProvider)
    : IRequestHandler<GetCryptoQuoteQuery, CryptoQuoteDto>
{
    public async Task<CryptoQuoteDto> Handle(
        GetCryptoQuoteQuery request,
        CancellationToken cancellationToken)
    {
        var rates = await exchangeProvider
            .GetRatesAsync(cancellationToken);


        if (!rates.Rates.TryGetValue(request.Symbol.ToUpperInvariant(),out var cryptoRate))
        {
            throw new ApplicationValidationException(new[]
            {
                new ValidationFailure(
                    nameof(request.Symbol),
                    $"Unsupported symbol '{request.Symbol}'.")
            });
        }

        var eurPrice = 1m / cryptoRate;

        return new CryptoQuoteDto
        {
            Symbol = request.Symbol.ToUpperInvariant(),
            Quotes = new Dictionary<string, decimal>
            {
                ["EUR"] = Math.Round(eurPrice, 2),
                ["USD"] = Math.Round(eurPrice * rates.Rates["USD"], 2),
                ["GBP"] = Math.Round(eurPrice * rates.Rates["GBP"], 2),
                ["AUD"] = Math.Round(eurPrice * rates.Rates["AUD"], 2),
                ["BRL"] = Math.Round(eurPrice * rates.Rates["BRL"], 2)
            }
        };
    }
}
