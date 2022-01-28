import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export class Step00SimpleLambdaTracingStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function
    new lambda.Function(this, 'lambda-x-ray-tracing', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      // Enabling X-Ray Tracing
      tracing: lambda.Tracing.ACTIVE,
    });
  }
}
