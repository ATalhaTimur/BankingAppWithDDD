namespace Domain.Services;

public interface ICurrencyRateService
{
    decimal GetExchangeRate(string fromCurrency, string toCurrency);
}