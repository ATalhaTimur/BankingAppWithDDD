using Domain.Entities;

namespace Domain.Repositories;

public interface IUserRepository
{
    Task AddAsync(User user);
    Task<List<User>> GetAllAsync();
    Task<User?> GetByEmailAsync(string email);
}