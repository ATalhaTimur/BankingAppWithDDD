using Application.DTOs;
using Domain.Entities;
using Domain.Repositories;

namespace Application.UseCases;

public class UpdateTransactionUseCase
{
    private readonly ITransactionRepository _transactionRepo;
    private readonly IAccountRepository _accountRepo;

    public UpdateTransactionUseCase(ITransactionRepository transactionRepo, IAccountRepository accountRepo)
    {
        _transactionRepo = transactionRepo;
        _accountRepo = accountRepo;
    }

    public async Task HandleAsync(Guid transactionId, CreateTransactionRequest request)
    {
        var transaction = await _transactionRepo.GetByIdAsync(transactionId)
            ?? throw new Exception("Transaction not found");

        if (transaction.IsSystemGenerated)
            throw new Exception("System-generated transactions cannot be updated.");

        var account = await _transactionRepo.GetAccountByIdAsync(transaction.AccountId)
            ?? throw new Exception("Account not found");

        var fark = request.Amount - transaction.Amount;

        if (fark > 0)
            throw new Exception("You cannot increase the amount. Please create a new transaction.");

        if (fark < 0)
        {
            account.Balance += Math.Abs(fark);
            await _accountRepo.UpdateAsync(account);
        }

        transaction.Amount = request.Amount;
        transaction.Category = request.Category;
        transaction.Description = request.Description;
        transaction.TransactionType = request.TransactionType;

        await _transactionRepo.UpdateAsync(transaction);
    }
}