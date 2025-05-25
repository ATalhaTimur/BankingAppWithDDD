using Domain.Services;

namespace Infrastructure.Services;

public class MockCurrencyRateService : ICurrencyRateService
{
    private static readonly Dictionary<(string from, string to), decimal> Rates = new()
    {
        { ("TRY", "USD"), 0.031m },
        { ("TRY", "EUR"), 0.028m },
        { ("TRY", "XAU"), 0.00052m },
        { ("TRY", "XAG"), 0.034m },
        { ("USD", "TRY"), 32.20m },
        { ("EUR", "TRY"), 35.50m },
        { ("XAU", "TRY"), 1920m },
        { ("XAG", "TRY"), 29m }
    };

    public decimal GetExchangeRate(string from, string to)
    {
        if (from == to) return 1.0m;
        if (Rates.TryGetValue((from, to), out var rate)) return rate;

        throw new Exception($"No exchange rate available for {from} → {to}");
    }
}