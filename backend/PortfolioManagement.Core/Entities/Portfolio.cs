using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioManagement.Core.Entities;

public class Portfolio
{
    public int Id { get; set; }

    public int UserId { get; set; }

    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Required]
    [StringLength(3)]
    public string BaseCurrency { get; set; } = "USD";

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalValue { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalCost { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalGainLoss { get; set; }

    [Column(TypeName = "decimal(5,2)")]
    public decimal TotalGainLossPercent { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public User User { get; set; } = null!;
    public ICollection<Asset> Assets { get; set; } = new List<Asset>();
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}