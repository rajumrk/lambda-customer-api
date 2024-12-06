# lambda-customer-api
Lambda function for Customer Management API's
# lambda-customer-api

Lambda function for Customer Management APIs

## Overview

The `lambda-customer-api` is an AWS Lambda function designed to manage customer data. It provides a serverless solution for creating, reading, updating, and deleting customer information. The function interacts with Amazon DynamoDB for data storage and is exposed via API Gateway.

## Features

- Create a new customer
- Retrieve all customers
- Retrieve a specific customer by ID
- Update a specific customer by ID
- Delete a specific customer by ID

## Prerequisites

- AWS account with appropriate permissions
- AWS CLI configured with your credentials
- Node.js 14.x or higher

## Project Structure

- `index.mjs`: Main Lambda function code
- `package.json`: Node.js dependencies and scripts

## Setup

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd lambda-customer-api

   Install dependencies: npm install

   Deploy the Lambda function: You can use the AWS CLI or AWS Management Console to deploy the Lambda function. Ensure you have the necessary IAM roles and policies in place.

   Environment Variables
TABLE_NAME: Name of the DynamoDB table
API Endpoints
POST /customers: Create a new customer
GET /customers: Retrieve all customers
GET /customers/{customerId}: Retrieve a specific customer by ID
PUT /customers/{customerId}: Update a specific customer by ID
DELETE /customers/{customerId}: Delete a specific customer by ID