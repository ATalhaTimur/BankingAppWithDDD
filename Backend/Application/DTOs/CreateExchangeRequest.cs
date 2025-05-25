namespace Application.DTOs;

public record CreateExchangeRequest(
    Guid FromAccountId,    // Kullanıcının hangi hesabından para çıkacak
    Guid ToAccountId,      // Hangi hesabına geçecek (farklı tür)
    decimal Amount         // Gönderilen miktar (FromAccount birimi ile)
);