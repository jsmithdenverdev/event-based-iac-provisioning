namespace Account.Functions.Events;

public class AccountCreatedEvent
{
    public string Id { get; set; }

    public AccountCreatedEvent(Models.Account account)
    {
        Id = account.Id;
    }
}