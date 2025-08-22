using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioManagement.Core.DTOs;
using PortfolioManagement.Infrastructure.Services;
using System.Security.Claims;

namespace PortfolioManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        try
        {
            var result = await _authService.LoginAsync(request);
            
            if (result == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during login", error = ex.Message });
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var result = await _authService.RegisterAsync(request);
            
            if (result == null)
            {
                return BadRequest(new { message = "User with this email or username already exists" });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during registration", error = ex.Message });
        }
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResponse>> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var result = await _authService.RefreshTokenAsync(request.RefreshToken);
            
            if (result == null)
            {
                return Unauthorized(new { message = "Invalid or expired refresh token" });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during token refresh", error = ex.Message });
        }
    }

    [HttpPost("revoke")]
    [Authorize]
    public async Task<ActionResult> RevokeToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var result = await _authService.RevokeTokenAsync(request.RefreshToken);
            
            if (!result)
            {
                return BadRequest(new { message = "Token not found" });
            }

            return Ok(new { message = "Token revoked successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during token revocation", error = ex.Message });
        }
    }

    [HttpPost("revoke-all")]
    [Authorize]
    public async Task<ActionResult> RevokeAllTokens()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized();
            }

            var result = await _authService.RevokeAllUserTokensAsync(userId);
            
            if (!result)
            {
                return BadRequest(new { message = "Failed to revoke tokens" });
            }

            return Ok(new { message = "All tokens revoked successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during token revocation", error = ex.Message });
        }
    }

    [HttpGet("me")]
    [Authorize]
    public ActionResult<object> GetCurrentUser()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var usernameClaim = User.FindFirst(ClaimTypes.Name);
            var emailClaim = User.FindFirst(ClaimTypes.Email);
            var firstNameClaim = User.FindFirst("FirstName");
            var lastNameClaim = User.FindFirst("LastName");
            var baseCurrencyClaim = User.FindFirst("BaseCurrency");

            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized();
            }

            return Ok(new
            {
                Id = userId,
                Username = usernameClaim?.Value ?? "",
                Email = emailClaim?.Value ?? "",
                FirstName = firstNameClaim?.Value ?? "",
                LastName = lastNameClaim?.Value ?? "",
                BaseCurrency = baseCurrencyClaim?.Value ?? "USD"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving user information", error = ex.Message });
        }
    }
}