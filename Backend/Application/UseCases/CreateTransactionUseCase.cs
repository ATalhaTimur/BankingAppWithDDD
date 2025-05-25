using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;

namespace Application.UseCases;

public class CreateTransactionUseCase
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IMapper _mapper;

    public CreateTransactionUseCase(ITransactionRepository transactionRepository, IMapper mapper)
    {
        _transactionRepository = transactionRepository;
        _mapper = mapper;
    }

    public async Task<TransactionResponse> HandleAsync(CreateTransactionRequest request)
    {
        var account = await _transactionRepository.GetAccountByIdAsync(request.AccountId)
            ?? throw new Exception("Account not found");

        if (request.TransactionType == TransactionType.Expense)
        {
            if (account.Balance < request.Amount)
                throw new Exception("Insufficient balance for this expense");

            account.Balance -= request.Amount;
        }
        else if (request.TransactionType == TransactionType.Income)
        {
            account.Balance += request.Amount;
        }

        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            AccountId = request.AccountId,
            Amount = request.Amount,
            TransactionType = request.TransactionType,
            Category = request.Category,
            Description = request.Description,
            IsSystemGenerated = false,
            ExchangeRate = null,
            CreatedAt = DateTime.UtcNow
        };

        await _transactionRepository.AddWithAccountUpdateAsync(transaction, account);

        return _mapper.Map<TransactionResponse>(transaction);
    }
}