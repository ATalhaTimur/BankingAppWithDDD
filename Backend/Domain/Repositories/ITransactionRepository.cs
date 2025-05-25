using Domain.Entities;

namespace Domain.Repositories;

public interface ITransactionRepository
{
    Task AddAsync(Transaction transaction);
    Task<List<Transaction>> GetByAccountIdAsync(Guid accountId);
    Task<Account?> GetAccountByIdAsync(Guid accountId);
    Task AddWithAccountUpdateAsync(Transaction transaction, Account account);

    Task<Transaction?> GetByIdAsync(Guid id);
    Task UpdateAsync(Transaction transaction);
    Task DeleteAsync(Guid id);
    Task<List<Transaction>> FilterAsync(Guid accountId, TransactionCategory? category, DateTime? fromDate, DateTime? toDate);
}