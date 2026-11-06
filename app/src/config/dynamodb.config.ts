import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';

const getClientConfig = (): DynamoDBClientConfig => {
  const region = process.env.AWS_REGION || 'us-east-1';
  const endpoint = process.env.DYNAMODB_ENDPOINT;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  const config: DynamoDBClientConfig = {
    region,
  };

  if (endpoint) {
    config.endpoint = endpoint;
  }

  if (accessKeyId && secretAccessKey) {
    config.credentials = {
      accessKeyId,
      secretAccessKey,
    };
  }

  return config;
};

const getDocumentConfig = (): DynamoDBDocumentClientConfig => {
  const clientConfig = getClientConfig();
  const client = DynamoDBDocumentClient.from(clientConfig, {
    marshallOptions: {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
    unmarshallOptions: {
      wrapNumbers: false,
    },
  });

  return { client };
};

export const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'orders';

export const dynamoDBDocumentClient = DynamoDBDocumentClient.from(getClientConfig(), {
  marshallOptions: {
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
});

export const createDynamoDBClient = (): DynamoDBClient => {
  return new DynamoDBClient(getClientConfig());
};

export const createDocumentClient = (): DynamoDBDocumentClient => {
  return DynamoDBDocumentClient.from(createDynamoDBClient(), {
    marshallOptions: {
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
    unmarshallOptions: {
      wrapNumbers: false,
    },
  });
};