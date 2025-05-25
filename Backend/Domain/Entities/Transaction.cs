namespace Domain.Entities;

public class Transaction
{
    public Guid Id { get; set; }
    public Guid AccountId { get; set; }

    public decimal Amount { get; set; }
    public TransactionType TransactionType { get; set; } // Gider mi Gelir mi
    public TransactionCategory Category { get; set; }
    public string? Description { get; set; }

    public bool IsSystemGenerated { get; set; } = false;
    public decimal? ExchangeRate { get; set; } // Döviz işlemleri için
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Account? Account { get; set; }
}