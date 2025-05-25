using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class CreateAccountRequestValidator : AbstractValidator<CreateAccountRequest>
{
    public CreateAccountRequestValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();
        RuleFor(x => x.FullName)
         .NotEmpty()
        .MaximumLength(100);
        RuleFor(x => x.AccountType).IsInEnum();
    }
}