using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;

namespace Application.UseCases;

public class CreateTransferUseCase
{
    private readonly IAccountRepository _accountRepo;
    private readonly ITransferRepository _transferRepo;
    private readonly IMapper _mapper;

    public CreateTransferUseCase(
        IAccountRepository accountRepo,
        ITransferRepository transferRepo,
        IMapper mapper)
    {
        _accountRepo = accountRepo;
        _transferRepo = transferRepo;
        _mapper = mapper;
    }

    public async Task<TransferResponse> HandleAsync(CreateTransferRequest request)
    {
        const decimal feeRate = 0.02m;

        var senderAccount = await _accountRepo.GetByIdAsync(request.SenderAccountId)
            ?? throw new Exception("Sender account not found");

        var receiverAccount = await _accountRepo.GetByIbanAsync(request.ReceiverIban)
            ?? throw new Exception("Receiver account not found");

        if (receiverAccount.FullName.ToLowerInvariant().Trim() != request.ReceiverFullName.ToLowerInvariant().Trim())
            throw new Exception("Receiver full name does not match IBAN");

        if (senderAccount.AccountType != receiverAccount.AccountType)
            throw new Exception("Cannot transfer between different account types");

        var fee = Math.Round(request.Amount * feeRate, 2);
        var total = request.Amount + fee;

        if (senderAccount.Balance < total)
            throw new Exception("Insufficient balance");

        senderAccount.Balance -= total;
        receiverAccount.Balance += request.Amount;

        var transfer = new Transfer
        {
            Id = Guid.NewGuid(),
            SenderAccountId = senderAccount.Id,
            ReceiverAccountId = receiverAccount.Id,
            Amount = request.Amount,
            Fee = fee,
            CreatedAt = DateTime.UtcNow
        };

        await _transferRepo.AddAsync(transfer);

        return _mapper.Map<TransferResponse>(transfer);
    }
}