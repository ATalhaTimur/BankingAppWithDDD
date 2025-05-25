using Domain.Entities;

namespace Application.DTOs;

public class TransactionFilterRequest
{
    public Guid AccountId { get; set; }
    public TransactionCategory? Category { get; set; }
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
}