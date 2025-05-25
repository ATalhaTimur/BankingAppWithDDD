using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;

namespace Application.UseCases;

public class GetTransactionsByFilterUseCase
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IMapper _mapper;

    public GetTransactionsByFilterUseCase(ITransactionRepository transactionRepository, IMapper mapper)
    {
        _transactionRepository = transactionRepository;
        _mapper = mapper;
    }

    public async Task<List<TransactionResponse>> HandleAsync(TransactionFilterRequest filter)
    {
        var transactions = await _transactionRepository.FilterAsync(
            filter.AccountId,
            filter.Category,
            filter.FromDate,
            filter.ToDate
        );

        return _mapper.Map<List<TransactionResponse>>(transactions);
    }
}