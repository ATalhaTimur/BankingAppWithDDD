using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class EfTransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;

    public EfTransactionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Transaction transaction)
    {
        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Transaction>> GetByAccountIdAsync(Guid accountId)
    {
        return await _context.Transactions
            .Where(t => t.AccountId == accountId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }
    public async Task<Account?> GetAccountByIdAsync(Guid accountId)
    {
        return await _context.Accounts.FindAsync(accountId);
    }

    public async Task AddWithAccountUpdateAsync(Transaction transaction, Account account)
    {
        _context.Transactions.Add(transaction);
        _context.Accounts.Update(account);
        await _context.SaveChangesAsync();
    }
}