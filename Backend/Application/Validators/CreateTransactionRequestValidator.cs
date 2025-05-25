using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class CreateTransactionRequestValidator : AbstractValidator<CreateTransactionRequest>
{
    public CreateTransactionRequestValidator()
    {
        RuleFor(x => x.AccountId).NotEmpty();
        RuleFor(x => x.Amount).GreaterThan(0).WithMessage("Amount must be greater than zero");
        RuleFor(x => x.TransactionType).IsInEnum().WithMessage("Invalid transaction type");
        RuleFor(x => x.Category).IsInEnum().WithMessage("Invalid category");
        RuleFor(x => x.Description)
            .MaximumLength(300)
            .When(x => !string.IsNullOrWhiteSpace(x.Description));
    }
}