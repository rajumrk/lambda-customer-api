import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "CustomerTable";

export const handler = async (event, context) => {
  const headers = {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*', // or specify your allowed origin
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
  };

  const httpMethod = event.httpMethod;
  let statusCode = 200;
  let body;
  try {
    switch (httpMethod) {
      case "GET":
        if (event.pathParameters && event.pathParameters.customerId) {
          body = await getCustomer(event.pathParameters.customerId);
        } else {
          body = await getCustomer();
        }
        break;
      case 'POST':
        body = await createCustomer(event.pathParameters.customerId, event);
        break;
      case 'PUT':
        body = await updateCustomer(event.pathParameters.customerId, event);
        break;
      case 'DELETE':
        body = await deleteCustomer(event.pathParameters.customerId);
        break;
      default:
        statusCode = 405;
        body = { message: `Unsupported method "${httpMethod}"` };
    }
  } catch (error) {
    statusCode = 500;
    body = { message: 'Internal Server Error', error: error.message };
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
};

const getCustomer = async (customerId) => {
  try {
    if (customerId) {
      // Fetch a specific customer by ID
      const result = await dynamo.send(new GetCommand({
        TableName: tableName,
        Key: { customerId },
      }));
      return result.Item ? result.Item : { message: `Customer with ID ${customerId} not found` };
    } else {
      // Fetch all customers
      const result = await dynamo.send(new ScanCommand({
        TableName: tableName,
      }));
      return result.Items;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCustomer = async (customerId, event) => {
  try {
    const requestJSON = JSON.parse(event.body);
    await dynamo.send(new PutCommand({
      TableName: tableName,
      Item: {
        customerId: requestJSON.customerId,
        name: requestJSON.name,
        email: requestJSON.email,
      },
    }));
    return { message: `Created customer with Id ${requestJSON.customerId}` };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCustomer = async (customerId, event) => {
  try {
    const requestJSON = JSON.parse(event.body);
    await dynamo.send(new PutCommand({
      TableName: tableName,
      Item: {
        customerId,
        name: requestJSON.name,
        email: requestJSON.email,
      },
    }));
    return { message: `Updated customer with Id ${requestJSON.customerId}` };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCustomer = async (customerId) => {
  try {
    await dynamo.send(new DeleteCommand({
      TableName: tableName,
      Key: { customerId },
    }));
    return { message: `Deleted customer ${customerId}` };
  } catch (error) {
    throw new Error(error.message);
  }
};
