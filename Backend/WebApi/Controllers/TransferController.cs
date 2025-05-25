using Application.DTOs;
using Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/transfers")]
public class TransferController : ControllerBase
{
    private readonly CreateTransferUseCase _createTransferUseCase;

    public TransferController(CreateTransferUseCase createTransferUseCase)
    {
        _createTransferUseCase = createTransferUseCase;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTransfer([FromBody] CreateTransferRequest request)
    {
        var result = await _createTransferUseCase.HandleAsync(request);
        return CreatedAtAction(nameof(CreateTransfer), new { id = result.Id }, result);
    }
}