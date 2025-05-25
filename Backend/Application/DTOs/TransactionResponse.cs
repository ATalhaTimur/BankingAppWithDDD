using Domain.Entities;

namespace Application.DTOs;

public record TransactionResponse(
    Guid Id,
    Guid AccountId,
    decimal Amount,
    TransactionType TransactionType,
    TransactionCategory Category,
    string? Description,
    bool IsSystemGenerated,
    decimal? ExchangeRate,
    DateTime CreatedAt
);