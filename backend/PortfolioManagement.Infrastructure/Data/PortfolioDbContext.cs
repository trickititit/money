using Microsoft.EntityFrameworkCore;
using PortfolioManagement.Core.Entities;
using PortfolioManagement.Core.Enums;

namespace PortfolioManagement.Infrastructure.Data;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Portfolio> Portfolios => Set<Portfolio>();
    public DbSet<Asset> Assets => Set<Asset>();
    public DbSet<StockAsset> StockAssets => Set<StockAsset>();
    public DbSet<RealEstateAsset> RealEstateAssets => Set<RealEstateAsset>();
    public DbSet<CryptoAsset> CryptoAssets => Set<CryptoAsset>();
    public DbSet<CashAsset> CashAssets => Set<CashAsset>();
    public DbSet<PreciousMetalsAsset> PreciousMetalsAssets => Set<PreciousMetalsAsset>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Asset hierarchy using TPH (Table Per Hierarchy)
        modelBuilder.Entity<Asset>()
            .HasDiscriminator<AssetType>(a => a.AssetType)
            .HasValue<StockAsset>(AssetType.Stock)
            .HasValue<RealEstateAsset>(AssetType.RealEstate)
            .HasValue<CryptoAsset>(AssetType.Cryptocurrency)
            .HasValue<CashAsset>(AssetType.Cash)
            .HasValue<PreciousMetalsAsset>(AssetType.PreciousMetals);

        // User configurations
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.HasIndex(u => u.Username).IsUnique();
            entity.HasIndex(u => u.Email).IsUnique();
            
            entity.Property(u => u.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
        });

        // Portfolio configurations
        modelBuilder.Entity<Portfolio>(entity =>
        {
            entity.HasKey(p => p.Id);
            
            entity.HasOne(p => p.User)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(p => p.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
            
            entity.Property(p => p.LastUpdated)
                .HasDefaultValueSql("GETUTCDATE()");
        });

        // Asset configurations
        modelBuilder.Entity<Asset>(entity =>
        {
            entity.HasKey(a => a.Id);
            
            entity.HasOne(a => a.Portfolio)
                .WithMany(p => p.Assets)
                .HasForeignKey(a => a.PortfolioId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(a => a.AcquiredDate)
                .HasDefaultValueSql("GETUTCDATE()");
            
            entity.Property(a => a.LastPriceUpdate)
                .HasDefaultValueSql("GETUTCDATE()");

            entity.HasIndex(a => new { a.PortfolioId, a.Symbol });
        });

        // Transaction configurations
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(t => t.Id);
            
            entity.HasOne(t => t.Portfolio)
                .WithMany(p => p.Transactions)
                .HasForeignKey(t => t.PortfolioId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(t => t.Asset)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AssetId)
                .OnDelete(DeleteBehavior.SetNull);

            entity.Property(t => t.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
            
            entity.Property(t => t.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            entity.HasIndex(t => new { t.PortfolioId, t.Date });
            entity.HasIndex(t => t.AssetSymbol);
        });

        // RefreshToken configurations
        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(rt => rt.Id);
            
            entity.HasOne(rt => rt.User)
                .WithMany(u => u.RefreshTokens)
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(rt => rt.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            entity.HasIndex(rt => rt.Token).IsUnique();
        });

        // Seed data
        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        // Seed default user
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Username = "admin",
                Email = "admin@portfoliomanagement.com",
                PasswordHash = "$2a$11$Zo/Z4zAWa4QWfX8pIv/WxegEHJWGImjpL.4CsKsWgxuGvO1tOaAGi", // password: admin123
                FirstName = "System",
                LastName = "Administrator",
                BaseCurrency = "USD",
                CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                IsActive = true
            }
        );

        // Seed default portfolio
        modelBuilder.Entity<Portfolio>().HasData(
            new Portfolio
            {
                Id = 1,
                UserId = 1,
                Name = "Main Portfolio",
                Description = "Primary investment portfolio",
                BaseCurrency = "USD",
                CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                LastUpdated = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            }
        );
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.Entity is Portfolio portfolio)
            {
                portfolio.LastUpdated = DateTime.UtcNow;
            }
            else if (entry.Entity is Transaction transaction)
            {
                transaction.UpdatedAt = DateTime.UtcNow;
            }
            else if (entry.Entity is Asset asset)
            {
                asset.LastPriceUpdate = DateTime.UtcNow;
            }
        }
    }
}