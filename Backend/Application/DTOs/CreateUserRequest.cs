namespace Application.DTOs;

public record CreateUserRequest(
    string FullName,
    string Email,
    string Password
);