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

    private readonly LoginUserUseCase _loginUserUseCase;

    public UserController(
       CreateUserUseCase createUserUseCase,
       GetUsersUseCase getUsersUseCase,
       LoginUserUseCase loginUserUseCase)
    {
        _createUserUseCase = createUserUseCase;
        _getUsersUseCase = getUsersUseCase;
        _loginUserUseCase = loginUserUseCase;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
    {
        var result = await _createUserUseCase.HandleAsync(request);
        return CreatedAtAction(nameof(CreateUser), new { id = result.Id }, result);
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var result = await _loginUserUseCase.HandleAsync(request);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _getUsersUseCase.HandleAsync();
        return Ok(users);
    }
}