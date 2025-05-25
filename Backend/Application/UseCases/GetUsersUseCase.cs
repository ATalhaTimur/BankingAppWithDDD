using Application.DTOs;
using AutoMapper;
using Domain.Repositories;

namespace Application.UseCases;

public class GetUsersUseCase
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public GetUsersUseCase(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<List<UserResponse>> HandleAsync()
    {
        var users = await _userRepository.GetAllAsync();
        return _mapper.Map<List<UserResponse>>(users);
    }
}