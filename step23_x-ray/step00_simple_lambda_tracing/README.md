# Simple Lambda Tracing

## Steps to code

1. Create new directory using `mkdir step00_simple_lambda_tracing`
2. Naviagte to newly created directory using `cd step00_simple_lambda_tracing`
3. Create new cdk app using `npm init app --language typescript`
4. Auto compile the code on each change using `npm run watch`
5. Install lambda in the app using `npm i @aws-cdk/aws-lambda` and update "./lib/step00_simple_lambda_tracing-stack.ts" to define a lambda function in which exray is enabled

   ```js
   import * as lambda from '@aws-cdk/aws-lambda';
   new lambda.Function(this, 'lambda-x-ray-tracing', {
     runtime: lambda.Runtime.NODEJS_14_X,
     code: lambda.Code.fromAsset('lambda'),
     handler: 'index.handler',
     tracing: lambda.Tracing.ACTIVE,
   });
   ```

6. Create "./lambda/app.ts" to define lambda handler code

   ```js
   import { APIGatewayEvent } from 'aws-lambda';
   exports.handler = async (event: APIGatewayEvent) => {
     return {
       statusCode: 200,
       body: 'Hello World',
     };
   };
   ```

7. Deploy the app using `cdk deploy`
8. Test using console
9. Destroy the app using `cdk destroy`
