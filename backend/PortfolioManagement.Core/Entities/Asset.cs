using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PortfolioManagement.Core.Enums;

namespace PortfolioManagement.Core.Entities;

public abstract class Asset
{
    public int Id { get; set; }

    public int PortfolioId { get; set; }

    public AssetType AssetType { get; set; }

    [Required]
    [StringLength(50)]
    public string Symbol { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,8)")]
    public decimal Quantity { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal AverageCost { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal CurrentPrice { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal CurrentValue { get; set; }

    [Required]
    [StringLength(3)]
    public string Currency { get; set; } = "USD";

    public DateTime AcquiredDate { get; set; } = DateTime.UtcNow;
    public DateTime LastPriceUpdate { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Portfolio Portfolio { get; set; } = null!;
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}

public class StockAsset : Asset
{
    [StringLength(50)]
    public string Exchange { get; set; } = string.Empty;

    [StringLength(100)]
    public string Sector { get; set; } = string.Empty;

    [StringLength(100)]
    public string Industry { get; set; } = string.Empty;

    [Column(TypeName = "decimal(8,2)")]
    public decimal PERatio { get; set; }

    [Column(TypeName = "decimal(5,2)")]
    public decimal DividendYield { get; set; }

    public long MarketCap { get; set; }

    [StringLength(10)]
    public string Country { get; set; } = string.Empty;
}

public class RealEstateAsset : Asset
{
    public PropertyType PropertyType { get; set; }

    [StringLength(500)]
    public string Address { get; set; } = string.Empty;

    [StringLength(100)]
    public string City { get; set; } = string.Empty;

    [StringLength(50)]
    public string State { get; set; } = string.Empty;

    [StringLength(10)]
    public string Country { get; set; } = string.Empty;

    [Column(TypeName = "decimal(10,2)")]
    public decimal SquareFootage { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal AnnualRent { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal PropertyTax { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal MaintenanceCost { get; set; }

    public DateTime LastValuation { get; set; } = DateTime.UtcNow;
}

public class CryptoAsset : Asset
{
    [StringLength(50)]
    public string Blockchain { get; set; } = string.Empty;

    [StringLength(100)]
    public string ContractAddress { get; set; } = string.Empty;

    public long MarketCap { get; set; }

    public long CirculatingSupply { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal DayVolume { get; set; }

    [Column(TypeName = "decimal(5,2)")]
    public decimal StakingReward { get; set; }

    public bool IsStaked { get; set; }
}

public class CashAsset : Asset
{
    public AccountType AccountType { get; set; }

    [StringLength(200)]
    public string BankName { get; set; } = string.Empty;

    [StringLength(50)]
    public string AccountNumber { get; set; } = string.Empty;

    [Column(TypeName = "decimal(5,2)")]
    public decimal InterestRate { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal MonthlyInterest { get; set; }

    public DateTime MaturityDate { get; set; }
}

public class PreciousMetalsAsset : Asset
{
    public MetalType MetalType { get; set; }

    public MetalForm Form { get; set; }

    [Column(TypeName = "decimal(5,3)")]
    public decimal Purity { get; set; } = 0.999m;

    [StringLength(200)]
    public string StorageLocation { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,2)")]
    public decimal StorageFee { get; set; }

    [Column(TypeName = "decimal(10,3)")]
    public decimal Weight { get; set; }

    [StringLength(10)]
    public string WeightUnit { get; set; } = "oz";
}