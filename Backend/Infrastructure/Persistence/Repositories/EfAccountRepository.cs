using Domain.Entities;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class EfAccountRepository : IAccountRepository
{
    private readonly AppDbContext _context;

    public EfAccountRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Account account)
    {
        _context.Accounts.Add(account);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Account>> GetByUserIdAsync(Guid userId)
    {
        return await _context.Accounts
            .Where(a => a.UserId == userId)
            .ToListAsync();
    }
    public async Task<Account?> GetByIbanAsync(string iban)
    {
        return await _context.Accounts.FirstOrDefaultAsync(a => a.Iban == iban);
    }
    public async Task<Account?> GetByIdAsync(Guid accountId)
    {
        return await _context.Accounts.FindAsync(accountId);
    }

    public async Task UpdateAsync(Account account)
    {
        _context.Accounts.Update(account);
        await _context.SaveChangesAsync();
    }
}