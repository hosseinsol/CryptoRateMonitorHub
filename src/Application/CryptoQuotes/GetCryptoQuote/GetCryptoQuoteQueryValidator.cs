namespace Microsoft.Extensions.DependencyInjection.CryptoQuotes.GetCryptoQuote;

public class GetCryptoQuoteQueryValidator
    : AbstractValidator<GetCryptoQuoteQuery>
{
    public GetCryptoQuoteQueryValidator()
    {
        RuleFor(v => v.Symbol)
            .NotEmpty()
            .Matches("^[A-Za-z]{2,10}$");
    }
}
