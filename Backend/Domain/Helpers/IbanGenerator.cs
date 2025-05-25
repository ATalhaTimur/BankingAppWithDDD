namespace Domain.Helpers;

public static class IbanGenerator
{
    public static string Generate()
    {
        const string countryCode = "TR";
        const string controlDigits = "96";
        const string bankCode = "12345";
        const string reserveArea = "0";

        string randomPart = GenerateRandomDigits(16);
        return $"{countryCode}{controlDigits}{bankCode}{reserveArea}{randomPart}";
    }

    private static string GenerateRandomDigits(int length)
    {
        Random random = new();
        return new string(Enumerable.Range(0, length)
            .Select(_ => random.Next(0, 10).ToString()[0])
            .ToArray());
    }
}