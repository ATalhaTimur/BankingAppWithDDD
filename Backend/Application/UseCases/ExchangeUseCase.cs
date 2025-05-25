using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using Domain.Services;


namespace Application.UseCases;

public class ExchangeUseCase
{
    private readonly IAccountRepository _accountRepo;
    private readonly ITransactionRepository _transactionRepo;
    private readonly ICurrencyRateService _currencyRateService;

    public ExchangeUseCase(
        IAccountRepository accountRepo,
        ITransactionRepository transactionRepo,
        ICurrencyRateService currencyRateService)
    {
        _accountRepo = accountRepo;
        _transactionRepo = transactionRepo;
        _currencyRateService = currencyRateService;
    }

    public async Task HandleAsync(CreateExchangeRequest request)
    {
        const decimal feeRate = 0.02m;

        var fromAccount = await _accountRepo.GetByIdAsync(request.FromAccountId)
            ?? throw new Exception("Sender account not found");

        var toAccount = await _accountRepo.GetByIdAsync(request.ToAccountId)
            ?? throw new Exception("Receiver account not found");

        if (fromAccount.UserId != toAccount.UserId)
            throw new Exception("Accounts must belong to the same user");

        if (fromAccount.AccountType == toAccount.AccountType)
            throw new Exception("Cannot exchange between the same account types");

        var fee = Math.Round(request.Amount * feeRate, 2);
        var total = request.Amount + fee;

        if (fromAccount.Balance < total)
            throw new Exception("Insufficient balance");

        var rate = _currencyRateService.GetExchangeRate(fromAccount.AccountType.ToString(), toAccount.AccountType.ToString());
        var convertedAmount = Math.Round(request.Amount * rate, 2);

        fromAccount.Balance -= total;
        toAccount.Balance += convertedAmount;

        var feeTransaction = new Transaction
        {
            Id = Guid.NewGuid(),
            AccountId = fromAccount.Id,
            Amount = fee,
            TransactionType = TransactionType.Expense,
            Category = TransactionCategory.Exchange,
            Description = $"Exchange fee {fromAccount.AccountType} → {toAccount.AccountType}",
            IsSystemGenerated = true,
            ExchangeRate = rate,
            CreatedAt = DateTime.UtcNow
        };

         await _transactionRepo.AddWithAccountUpdateAsync(feeTransaction, fromAccount);
         await _accountRepo.UpdateAsync(toAccount); // Güncellenmiş balance'ı DB'ye yansıt
    }
}