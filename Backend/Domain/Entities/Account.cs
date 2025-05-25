namespace Domain.Entities;

public class Account
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }  // Foreign Key

    public string Iban { get; set; } = null!;
    public string FullName { get; set; } = null!; 
    public AccountType AccountType { get; set; }
    public decimal Balance { get; set; } = 10000;  // Başlangıç bakiyesi
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User? User { get; set; }
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();


}