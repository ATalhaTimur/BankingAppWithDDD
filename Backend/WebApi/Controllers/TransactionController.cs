using Application.DTOs;
using Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase
{
    private readonly CreateTransactionUseCase _createTransactionUseCase;
    private readonly GetTransactionsByAccountIdUseCase _getTransactionsByAccountIdUseCase;

    public TransactionController(
        CreateTransactionUseCase createTransactionUseCase,
        GetTransactionsByAccountIdUseCase getTransactionsByAccountIdUseCase)
    {
        _createTransactionUseCase = createTransactionUseCase;
        _getTransactionsByAccountIdUseCase = getTransactionsByAccountIdUseCase;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTransactionRequest request)
    {
        var result = await _createTransactionUseCase.HandleAsync(request);
        return CreatedAtAction(nameof(Create), new { id = result.Id }, result);
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] Guid accountId)
    {
        var result = await _getTransactionsByAccountIdUseCase.HandleAsync(accountId);
        return Ok(result);
    }
}