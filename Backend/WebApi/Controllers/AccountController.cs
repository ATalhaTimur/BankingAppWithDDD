using Application.DTOs;
using Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/accounts")]
public class AccountController : ControllerBase
{
    private readonly CreateAccountUseCase _createAccountUseCase;
    private readonly GetAccountsByUserIdUseCase _getAccountsByUserIdUseCase;

    public AccountController(CreateAccountUseCase createAccountUseCase, GetAccountsByUserIdUseCase getAccountsByUserIdUseCase)
    {
        _createAccountUseCase = createAccountUseCase;
        _getAccountsByUserIdUseCase = getAccountsByUserIdUseCase;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAccount([FromBody] CreateAccountRequest request)
    {
        var result = await _createAccountUseCase.HandleAsync(request);
        return CreatedAtAction(nameof(CreateAccount), new { id = result.Id }, result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAccounts([FromQuery] Guid userId)
    {
        var result = await _getAccountsByUserIdUseCase.HandleAsync(userId);
        return Ok(result);
    }
}