namespace Domain.Entities;

public class ExternalTransferLog
{
    public Guid Id { get; set; }
    public Guid FromAccountId { get; set; }

    public string ToIban { get; set; } = null!;
    public decimal Amount { get; set; }
    public string Status { get; set; } = "Success"; // Veya Failed
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Account? FromAccount { get; set; }
}