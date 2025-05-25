using Application.DTOs;
using Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/exchange")]
public class ExchangeController : ControllerBase
{
    private readonly ExchangeUseCase _exchangeUseCase;

    public ExchangeController(ExchangeUseCase exchangeUseCase)
    {
        _exchangeUseCase = exchangeUseCase;
    }

    [HttpPost]
    public async Task<IActionResult> Exchange([FromBody] CreateExchangeRequest request)
    {
        await _exchangeUseCase.HandleAsync(request);
        return NoContent(); // işlem başarılı ama response dönmüyoruz
    }
}