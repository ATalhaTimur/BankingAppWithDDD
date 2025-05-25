using Application.DTOs;
using AutoMapper;
using Domain.Repositories;

namespace Application.UseCases;

public class GetAccountsByUserIdUseCase
{
    private readonly IAccountRepository _accountRepository;
    private readonly IMapper _mapper;

    public GetAccountsByUserIdUseCase(IAccountRepository accountRepository, IMapper mapper)
    {
        _accountRepository = accountRepository;
        _mapper = mapper;
    }

    public async Task<List<AccountResponse>> HandleAsync(Guid userId)
    {
        var accounts = await _accountRepository.GetByUserIdAsync(userId);
        return _mapper.Map<List<AccountResponse>>(accounts);
    }
}