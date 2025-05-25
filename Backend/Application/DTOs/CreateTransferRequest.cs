namespace Application.DTOs;

public record CreateTransferRequest(
    Guid SenderAccountId,
    string ReceiverIban,
    string ReceiverFullName,
    decimal Amount
);