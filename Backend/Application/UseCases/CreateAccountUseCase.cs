using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;

namespace Application.UseCases;

public class CreateAccountUseCase
{
    private readonly IAccountRepository _accountRepository;
    private readonly IMapper _mapper;

    public CreateAccountUseCase(IAccountRepository accountRepository, IMapper mapper)
    {
        _accountRepository = accountRepository;
        _mapper = mapper;
    }

    public async Task<AccountResponse> HandleAsync(CreateAccountRequest request)
    {
        const int maxAttempts = 5;
        string iban;
        int tries = 0;

        do
        {
            iban = Domain.Helpers.IbanGenerator.Generate();
            var existing = await _accountRepository.GetByIbanAsync(iban);
            if (existing is null) break;
            tries++;
        } while (tries < maxAttempts);

        if (tries == maxAttempts)
            throw new Exception("Could not generate a unique IBAN");

        var account = new Account
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            AccountType = request.AccountType,
            Iban = iban,
            FullName = request.FullName.ToLowerInvariant().Trim(), // normalize edildi
            CreatedAt = DateTime.UtcNow
        };

        await _accountRepository.AddAsync(account);

        return _mapper.Map<AccountResponse>(account);
    }
}