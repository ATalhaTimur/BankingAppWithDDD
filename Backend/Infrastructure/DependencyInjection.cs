using Application.UseCases;
using Domain.Repositories;
using Infrastructure.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Domain.Services;
using Infrastructure.Services;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, EfUserRepository>();
        services.AddScoped<CreateUserUseCase>();
        services.AddScoped<GetUsersUseCase>();
        services.AddScoped<LoginUserUseCase>();

        services.AddScoped<IAccountRepository, EfAccountRepository>();
        services.AddScoped<CreateAccountUseCase>();
        services.AddScoped<GetAccountsByUserIdUseCase>();

        services.AddScoped<ITransferRepository, EfTransferRepository>();
        services.AddScoped<CreateTransferUseCase>();


        services.AddScoped<ITransactionRepository, EfTransactionRepository>();
        services.AddScoped<CreateTransactionUseCase>();
        services.AddScoped<GetTransactionsByAccountIdUseCase>();
        services.AddScoped<UpdateTransactionUseCase>();
        services.AddScoped<DeleteTransactionUseCase>();
        services.AddScoped<GetTransactionsByFilterUseCase>();

        services.AddSingleton<ICurrencyRateService, MockCurrencyRateService>();
        services.AddScoped<ExchangeUseCase>();

        return services;
    }
}