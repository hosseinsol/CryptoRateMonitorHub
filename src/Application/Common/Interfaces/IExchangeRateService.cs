using CryptoRateMonitor.Application.Common.Models;

namespace CryptoRateMonitor.Application.Common.Interfaces;

public interface IExchangeRateService
{
    Task<ExchangeRatesDto> GetRatesAsync(
        CancellationToken cancellationToken);
    Task<decimal> ConvertAsync(
        string from,
        string to,
        decimal amount,
        CancellationToken cancellationToken);
}
