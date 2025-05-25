using Application.DTOs;
using AutoMapper;
using Domain.Repositories;

namespace Application.UseCases;

public class GetTransactionsByAccountIdUseCase
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IMapper _mapper;

    public GetTransactionsByAccountIdUseCase(ITransactionRepository transactionRepository, IMapper mapper)
    {
        _transactionRepository = transactionRepository;
        _mapper = mapper;
    }

    public async Task<List<TransactionResponse>> HandleAsync(Guid accountId)
    {
        var transactions = await _transactionRepository.GetByAccountIdAsync(accountId);
        return _mapper.Map<List<TransactionResponse>>(transactions);
    }
}