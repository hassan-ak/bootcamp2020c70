# Core Concepts

## Reading Material

- [Subsegments](https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-subsegments)
- [Annotations and metadata](https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-annotations)
- [Groups](https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-groups)

## Steps to code

1. Create new directory using `mkdir step02_core_concepts`
2. Naviagte to newly created directory using `cd step02_core_concepts`
3. Create new cdk app using `npm init app --language typescript`
4. Auto compile the code on each change using `npm run watch`
5. Install IAM in the app using `npm i @aws-cdk/aws-iam` and update "./lib/step02_core_concepts-stack.ts" to define a new role for lambda function

   ```js
   import * as iam from '@aws-cdk/aws-iam';
   const role = new iam.Role(this, 'LambdaRole', {
     assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
   });
   ```

6. update "./lib/step02_core_concepts-stack.ts" to define a new policy for accessing the s3 bucket and add that policy to the role

   ```js
   const policy = new iam.PolicyStatement({
     effect: iam.Effect.ALLOW,
     actions: ['s3:Get*', 's3:List*'],
     resources: ['*'],
   });
   role.addToPolicy(policy);
   ```

7. Install lambda in the app using `npm i @aws-cdk/aws-lambda` and update "./lib/step02_core_concepts-stack.ts" to define a lambda function in which exray is enabled

   ```js
   import * as lambda from '@aws-cdk/aws-lambda';
   new lambda.Function(this, 'lambda-s3-x-ray-tracing', {
     runtime: lambda.Runtime.NODEJS_14_X,
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
   const uuidv4 = () => {
     return 'xxxx-4xxx-yxxx-'.replace(/[xy]/g, function (c) {
       var r = (Math.random() * 16) | 0,
         v = c == 'x' ? r : (r & 0x3) | 0x8;
       return v.toString(16);
     });
   };
   exports.handler = async (event: APIGatewayEvent) => {
     const segment = AWSXRay.getSegment();
     const subSegment = segment?.addNewSubsegment('GenerateId');
     const id = uuidv4();
     const name = 'Jhon';
     const company = 'panacloud';
     subSegment?.addAnnotation('userId', id);
     subSegment?.addAnnotation('userName', name);
     subSegment?.addAnnotation('userCompany', company);
     subSegment?.close();
     const s3 = AWSXRay.captureAWSClient(new AWS.S3());
     await s3
       .listBuckets((err, data) => {
         if (data) {
           console.log('Success', data.Buckets);
         } else {
           console.log('Error', err);
         }
       })
       .promise();
     return {
       statusCode: 200,
       body: {
         userId: id,
         userName: name,
         userCompany: company,
       },
     };
   };
   ```

9. Deploy the app using `cdk deploy`
10. Test using console
11. Destroy the app using `cdk destroy`
