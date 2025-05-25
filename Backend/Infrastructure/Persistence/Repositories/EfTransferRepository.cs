using Domain.Entities;
using Domain.Repositories;

namespace Infrastructure.Persistence.Repositories;

public class EfTransferRepository : ITransferRepository
{
    private readonly AppDbContext _context;

    public EfTransferRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Transfer transfer)
    {
        _context.Transfers.Add(transfer);
        await _context.SaveChangesAsync(); //  Bütün değişiklikleri kaydeder (sender ve reciver balance degisiklikleri)
    }
}