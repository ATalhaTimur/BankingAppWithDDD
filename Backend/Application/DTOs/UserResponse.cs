namespace Application.DTOs;

public record UserResponse(
    Guid Id,
    string FullName,
    string Email,
    DateTime CreatedAt
);