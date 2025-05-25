using Domain.Entities;

namespace Application.DTOs;

public record AccountResponse(
    Guid Id,
    Guid UserId,
    string Iban,
    string FullName,
    AccountType AccountType,
    decimal Balance,
    DateTime CreatedAt
);