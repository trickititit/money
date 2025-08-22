namespace PortfolioManagement.Core.Enums;

public enum AssetType
{
    Stock = 1,
    RealEstate = 2,
    Cryptocurrency = 3,
    Cash = 4,
    PreciousMetals = 5
}

public enum TransactionType
{
    Buy = 1,
    Sell = 2,
    Dividend = 3,
    Interest = 4,
    Rent = 5,
    Split = 6,
    Merge = 7,
    StakingReward = 8,
    Fee = 9,
    Transfer = 10,
    Deposit = 11,
    Withdrawal = 12
}

public enum PropertyType
{
    Residential = 1,
    Commercial = 2,
    Industrial = 3,
    Land = 4,
    REIT = 5
}

public enum MetalType
{
    Gold = 1,
    Silver = 2,
    Platinum = 3,
    Palladium = 4
}

public enum MetalForm
{
    Coins = 1,
    Bars = 2,
    ETF = 3,
    Certificate = 4
}

public enum AccountType
{
    Checking = 1,
    Savings = 2,
    Investment = 3,
    Certificate = 4,
    MoneyMarket = 5
}