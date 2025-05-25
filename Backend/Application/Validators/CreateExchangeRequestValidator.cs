using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class CreateExchangeRequestValidator : AbstractValidator<CreateExchangeRequest>
{
    public CreateExchangeRequestValidator()
    {
        RuleFor(x => x.FromAccountId)
            .NotEmpty().WithMessage("FromAccountId is required");

        RuleFor(x => x.ToAccountId)
            .NotEmpty().WithMessage("ToAccountId is required")
            .NotEqual(x => x.FromAccountId).WithMessage("From and To accounts must be different");

        RuleFor(x => x.Amount)
            .GreaterThan(0).WithMessage("Amount must be greater than zero");
    }
}