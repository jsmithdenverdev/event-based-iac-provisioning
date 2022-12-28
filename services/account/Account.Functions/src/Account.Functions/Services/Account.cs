using System.Text.Json;
using Account.Functions.Events;
using Amazon.SQS;

namespace Account.Functions.Services;

public interface IAccountService
{
    public Task<string> Create(Models.Account account);
}

public class AccountService : IAccountService
{
    private readonly string _queueUrl;
    private readonly IAmazonSQS _sqsClient;

    public AccountService(string queueUrl, IAmazonSQS sqsClient)
    {
        _queueUrl = queueUrl;
        _sqsClient = sqsClient;
    }

    public async Task<string> Create(Models.Account account)
    {
        var createdEvent = new AccountCreatedEvent(account);
        var response = await _sqsClient.SendMessageAsync(_queueUrl, JsonSerializer.Serialize(createdEvent));
        return account.Id;
    }
}