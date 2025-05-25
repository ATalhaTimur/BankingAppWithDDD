using Domain.Repositories;
using Domain.Entities;
namespace Application.UseCases;

public class DeleteTransactionUseCase
{
    private readonly ITransactionRepository _transactionRepo;
    private readonly IAccountRepository _accountRepo;

    public DeleteTransactionUseCase(ITransactionRepository transactionRepo, IAccountRepository accountRepo)
    {
        _transactionRepo = transactionRepo;
        _accountRepo = accountRepo;
    }

    public async Task HandleAsync(Guid transactionId)
    {
        var transaction = await _transactionRepo.GetByIdAsync(transactionId)
            ?? throw new Exception("Transaction not found");

        if (transaction.IsSystemGenerated)
            throw new Exception("System-generated transactions cannot be deleted.");

        var account = await _transactionRepo.GetAccountByIdAsync(transaction.AccountId)
            ?? throw new Exception("Account not found");

        if (transaction.TransactionType == TransactionType.Expense)
            account.Balance += transaction.Amount;
        else if (transaction.TransactionType == TransactionType.Income)
            account.Balance -= transaction.Amount;

        await _transactionRepo.DeleteAsync(transactionId);
        await _accountRepo.UpdateAsync(account);
    }
}