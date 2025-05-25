using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class CreateTransactionRequestValidator : AbstractValidator<CreateTransactionRequest>
{
    public CreateTransactionRequestValidator()
    {
        RuleFor(x => x.AccountId).NotEmpty();
        RuleFor(x => x.Amount).GreaterThan(0);
        RuleFor(x => x.TransactionType).IsInEnum();
        RuleFor(x => x.Category).IsInEnum();
        RuleFor(x => x.Description)
            .MaximumLength(300)
            .When(x => !string.IsNullOrWhiteSpace(x.Description));
    }
}