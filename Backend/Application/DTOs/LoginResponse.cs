namespace Application.DTOs;

public class LoginResponse
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
}