import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";
import { Config } from "~/config";
import { Account } from "~/types";

export interface AccountService {
  create(account: Account): Promise<Account>;
}

export function accountService(
  config: Config,
  dynamodb: DynamoDBDocumentClient,
  sqs: SQSClient
): AccountService {
  return {
    async create(account) {
      account.id = randomUUID();

      await dynamodb.send(
        new PutItemCommand({
          TableName: config.TABLE_NAME,
          Item: {
            id: {
              S: account.id,
            },
            name: {
              S: account.name,
            },
          },
        })
      );

      await sqs.send(
        new SendMessageCommand({
          QueueUrl: config.INFRASTRUCTURE_QUEUE_URL,
          MessageBody: JSON.stringify(account),
        })
      );

      return account;
    },
  };
}
