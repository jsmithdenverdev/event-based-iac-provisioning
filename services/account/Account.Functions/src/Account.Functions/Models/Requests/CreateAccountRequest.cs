namespace Account.Functions.Models.Requests;

public class CreateAccountRequest
{
    public string Name { get; set; }
    public Enums.Subscription Subscription { get; set; }
}