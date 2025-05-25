using Domain.Entities;

namespace Domain.Repositories;

public interface ITransactionRepository
{
    Task AddAsync(Transaction transaction);
    Task<List<Transaction>> GetByAccountIdAsync(Guid accountId);
    Task<Account?> GetAccountByIdAsync(Guid accountId);
    Task AddWithAccountUpdateAsync(Transaction transaction, Account account);
}