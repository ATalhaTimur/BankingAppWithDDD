using Domain.Entities;

namespace Application.DTOs;
public record CreateAccountRequest(
    Guid UserId,
    AccountType AccountType,
    string FullName
);