using System.ComponentModel.DataAnnotations;

namespace PortfolioManagement.Core.Entities;

public class User
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [StringLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [StringLength(100)]
    public string LastName { get; set; } = string.Empty;

    [StringLength(3)]
    public string BaseCurrency { get; set; } = "USD";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public ICollection<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}