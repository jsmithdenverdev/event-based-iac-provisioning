import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SQSClient } from "@aws-sdk/client-sqs";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { accountService, AccountService } from "~/services/account";
import { loadConfigFromProcessEnv } from "~/config";

// One time initilization code
const ddbClient = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {});
const sqsClient = new SQSClient({});
const config = loadConfigFromProcessEnv();
const service = accountService(config, ddbDocClient, sqsClient);

// Per request code
export const handler = ((service: AccountService) => {
  return async (
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
      return {
        statusCode: 400,
        body: "",
      };
    }

    const account = service.create(JSON.parse(event.body));

    return {
      statusCode: 201,
      body: JSON.stringify({
        account,
      }),
    };
  };
})(service);
