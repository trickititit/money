using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PortfolioManagement.Core.Enums;

namespace PortfolioManagement.Core.Entities;

public class Transaction
{
    public int Id { get; set; }

    public int PortfolioId { get; set; }

    public int? AssetId { get; set; }

    public TransactionType Type { get; set; }

    [Required]
    [StringLength(50)]
    public string AssetSymbol { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string AssetName { get; set; } = string.Empty;

    public AssetType AssetType { get; set; }

    [Column(TypeName = "decimal(18,8)")]
    public decimal Quantity { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Fees { get; set; }

    [Required]
    [StringLength(3)]
    public string Currency { get; set; } = "USD";

    public DateTime Date { get; set; } = DateTime.UtcNow;

    [StringLength(1000)]
    public string Notes { get; set; } = string.Empty;

    [StringLength(100)]
    public string ExchangeOrBroker { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Portfolio Portfolio { get; set; } = null!;
    public Asset? Asset { get; set; }
}