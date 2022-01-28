# Lambda with S3 Tracing

## Steps to code

1. Create new directory using `mkdir step01_lambda_with_s3_tracing`
2. Naviagte to newly created directory using `cd step01_lambda_with_s3_tracing`
3. Create new cdk app using `npm init app --language typescript`
4. Auto compile the code on each change using `npm run watch`
5. Install IAM in the app using `npm i @aws-cdk/aws-iam` and update "./lib/step01_lambda_with_s3_tracing-stack.ts" to define a new role for lambda function

   ```js
   import * as iam from '@aws-cdk/aws-iam';
   const role = new iam.Role(this, 'LambdaRole', {
     assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
   });
   ```

6. update "./lib/step01_lambda_with_s3_tracing-stack.ts" to define a new policy for accessing the s3 bucket and add that policy to the role

   ```js
   const policy = new iam.PolicyStatement({
     effect: iam.Effect.ALLOW,
     actions: ['s3:Get*', 's3:List*'],
     resources: ['*'],
   });
   role.addToPolicy(policy);
   ```

7. Install lambda in the app using `npm i @aws-cdk/aws-lambda` and update "./lib/step01_lambda_with_s3_tracing-stack.ts" to define a lambda function in which exray is enabled

   ```js
   import * as lambda from '@aws-cdk/aws-lambda';
   new lambda.Function(this, 'lambda-s3-x-ray-tracing', {
     runtime: lambda.Runtime.NODEJS_10_X,
     code: lambda.Code.fromAsset('lambda'),
     handler: 'index.handler',
     // Enabling X-Ray Tracing
     tracing: lambda.Tracing.ACTIVE,
     role: role,
   });
   ```

8. Create "./lambda/index.ts" to define lambda handler code

   ```js
   import * as AWS from 'aws-sdk';
   import * as AWSXRay from 'aws-xray-sdk-core';
   import { APIGatewayEvent } from 'aws-lambda';
   exports.handler = (event: APIGatewayEvent) => {
     const s3 = AWSXRay.captureAWSClient(new AWS.S3());
     s3.listBuckets((err, data) => {
       if (data) {
         console.log('Success', data.Buckets);
       } else {
         console.log('Error', err);
       }
     });
   };
   ```

9. Deploy the app using `cdk deploy`
10. Test using console
11. Destroy the app using `cdk destroy`
