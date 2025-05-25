using Application.DTOs;
using Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly CreateUserUseCase _createUserUseCase;
    private readonly GetUsersUseCase _getUsersUseCase;

    public UserController(CreateUserUseCase createUserUseCase, GetUsersUseCase getUsersUseCase)
    {
        _createUserUseCase = createUserUseCase;
        _getUsersUseCase = getUsersUseCase;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
    {
        var result = await _createUserUseCase.HandleAsync(request);
        return CreatedAtAction(nameof(CreateUser), new { id = result.Id }, result);
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _getUsersUseCase.HandleAsync();
        return Ok(users);
    }
}