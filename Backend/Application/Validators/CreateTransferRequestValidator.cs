using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class CreateTransferRequestValidator : AbstractValidator<CreateTransferRequest>
{
    public CreateTransferRequestValidator()
    {
        RuleFor(x => x.SenderAccountId).NotEmpty();
        RuleFor(x => x.ReceiverIban).NotEmpty().Length(26);
        RuleFor(x => x.ReceiverFullName)
            .NotEmpty()
            .MaximumLength(100);
            
        RuleFor(x => x.Amount).GreaterThan(0);
    }
}