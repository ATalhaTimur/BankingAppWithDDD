using Domain.Entities;

namespace Application.DTOs;

public record CreateTransactionRequest(
    Guid AccountId,
    decimal Amount,
    TransactionType TransactionType,
    TransactionCategory Category,
    string? Description
);