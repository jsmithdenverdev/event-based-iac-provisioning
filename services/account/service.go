package account

import (
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)


type Service interface {
	Create(Account) (string, error)
}

type service struct {
	client *dynamodb.DynamoDB
}


func NewService(table string, ) Service {
	return &service{
		client: client,
	}
}

func (s *service) Create(account Account) (string, error) {
	av, err := dynamodbattribute.MarshalMap(account)
	if err != nil {
		return "", err
	}

	err = s.client.PutItem(&dynamodb.PutItemInput{
		Item: av,
		TableName: ,
	})

	return "", nil
}
