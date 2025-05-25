using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;

namespace Application.UseCases;

public class CreateUserUseCase
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public CreateUserUseCase(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<UserResponse> HandleAsync(CreateUserRequest request)
    {
        // Duplicate email check
        var existing = await _userRepository.GetByEmailAsync(request.Email);
        if (existing != null)
            throw new Exception("Email already exists.");

        // Map
        var user = new User
        {
            Id = Guid.NewGuid(),
            FullName = request.FullName.ToLowerInvariant().Trim(),
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow
        };

        await _userRepository.AddAsync(user);

        return _mapper.Map<UserResponse>(user);
    }
}