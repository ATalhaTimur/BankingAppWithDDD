namespace Application.DTOs;

public record TransferResponse(
    Guid Id,
    Guid SenderAccountId,
    Guid ReceiverAccountId,
    decimal Amount,
    decimal Fee,
    DateTime CreatedAt
);