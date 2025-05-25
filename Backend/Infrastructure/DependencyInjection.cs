using Application.UseCases;
using Domain.Repositories;
using Infrastructure.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, EfUserRepository>();
        services.AddScoped<CreateUserUseCase>();
        services.AddScoped<GetUsersUseCase>();
        
        services.AddScoped<IAccountRepository, EfAccountRepository>();
        services.AddScoped<CreateAccountUseCase>();
        services.AddScoped<GetAccountsByUserIdUseCase>();

        services.AddScoped<ITransferRepository, EfTransferRepository>();
        services.AddScoped<CreateTransferUseCase>();

        return services;
    }
}