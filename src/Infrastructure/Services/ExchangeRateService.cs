using System.Text.Json;
using CryptoRateMonitor.Application.Common.Interfaces;
using CryptoRateMonitor.Application.Common.Models;

namespace Microsoft.Extensions.DependencyInjection.Services;

using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;

public sealed class ExchangeRateService
    : IExchangeRateService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly string _accessKey;

    public ExchangeRateService(
        HttpClient httpClient,
        IConfiguration configuration)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://api.exchangeratesapi.io/v1/");
        _configuration = configuration;
        _accessKey =
            configuration["ExchangeRates:ApiKey"]!;
    }

    public async Task<ExchangeRatesDto> GetRatesAsync(
        CancellationToken cancellationToken)
    {
        var url =
            $"latest?access_key={_accessKey}";

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        // var dto = JsonSerializer.Deserialize<ExchangeRatesDto>(jsonString, options);
        var response =
            await _httpClient.GetFromJsonAsync<ExchangeRatesDto>(
                url,
                cancellationToken);

        return response??new ExchangeRatesDto();
    }

    

    public async Task<decimal> ConvertAsync(
        string from,
        string to,
        decimal amount,
        CancellationToken cancellationToken)
    {
        var response =
            await _httpClient.GetFromJsonAsync<
                ConvertResponse>(
                $"convert?access_key={_accessKey}" +
                $"&from={from}" +
                $"&to={to}" +
                $"&amount={amount}",
                cancellationToken);

        return response!.Result;
    }

    private sealed class ConvertResponse
    {
        public decimal Result { get; init; }
    }
}
