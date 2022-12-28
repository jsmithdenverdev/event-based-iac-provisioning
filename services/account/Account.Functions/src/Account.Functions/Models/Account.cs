namespace Account.Functions.Models;

public class Account
{
    public string Id { get; set; }
    public string Name { get; set; }
    public Enums.Subscription Subscription { get; set; }
}