using Domain.Entities;

namespace Domain.Repositories;

public interface IAccountRepository
{
    Task AddAsync(Account account);
    Task<List<Account>> GetByUserIdAsync(Guid userId);

    Task<Account?> GetByIbanAsync(string iban);

    Task<Account?> GetByIdAsync(Guid accountId);
    Task UpdateAsync(Account account);
}