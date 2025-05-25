using Domain.Entities;

namespace Domain.Repositories;

public interface ITransferRepository
{
    Task AddAsync(Transfer transfer);
}