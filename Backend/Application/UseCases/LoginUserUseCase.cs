using Application.DTOs;
using Domain.Repositories;

namespace Application.UseCases;

public class LoginUserUseCase
{
    private readonly IUserRepository _userRepository;

    public LoginUserUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<LoginResponse> HandleAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        if (user is null)
            throw new Exception("Invalid email or password.");

        var isValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
        if (!isValid)
            throw new Exception("Invalid email or password.");

        return new LoginResponse
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email
        };
    }
}