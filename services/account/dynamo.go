package account

type dynamoDBClient interface{}

func newDynamoDBClient() dynamoDBClient {
	type client struct {}

	func (c *client) PutItem() (error) {
		return nil
	}
}
