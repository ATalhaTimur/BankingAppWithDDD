using Application.DTOs;
using Application.UseCases;
using Microsoft.AspNetCore.Mvc;
using Domain.Repositories;

namespace WebApi.Controllers;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase
{
    private readonly CreateTransactionUseCase _createTransactionUseCase;
    private readonly GetTransactionsByAccountIdUseCase _getTransactionsByAccountIdUseCase;
    private readonly UpdateTransactionUseCase _updateTransactionUseCase;
    private readonly DeleteTransactionUseCase _deleteTransactionUseCase;
    private readonly GetTransactionsByFilterUseCase _getTransactionsByFilterUseCase;

    public TransactionController(
        CreateTransactionUseCase createTransactionUseCase,
        GetTransactionsByAccountIdUseCase getTransactionsByAccountIdUseCase,
        UpdateTransactionUseCase updateTransactionUseCase,
        DeleteTransactionUseCase deleteTransactionUseCase,
        GetTransactionsByFilterUseCase getTransactionsByFilterUseCase)
    {
        _createTransactionUseCase = createTransactionUseCase;
        _getTransactionsByAccountIdUseCase = getTransactionsByAccountIdUseCase;
        _updateTransactionUseCase = updateTransactionUseCase;
        _deleteTransactionUseCase = deleteTransactionUseCase;
        _getTransactionsByFilterUseCase = getTransactionsByFilterUseCase;
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
    [HttpGet("filter")]
    public async Task<IActionResult> Filter([FromQuery] TransactionFilterRequest filter)
    {
        var result = await _getTransactionsByFilterUseCase.HandleAsync(filter);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateTransactionRequest request)
    {
        await _updateTransactionUseCase.HandleAsync(id, request);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _deleteTransactionUseCase.HandleAsync(id);
        return NoContent();
    }
} 