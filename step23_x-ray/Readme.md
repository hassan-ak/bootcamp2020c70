# AWS X-Ray

## Class Notes

X-ray help us analyze and debug distributed applications (workflow of different services and processes). Cloudwatch gives logs and matrices but for complete insights we use x-ray. Allows to see the entire application graphically.

- X-Ray helps answer three critical questions

  - How is my application doing?
  - Why is my application performing the way it is?
  - Who is impacted by the issues?

- Important Terms
  - Service graph
  - Traces
  - Segments

## Reading Material

- [Edges](https://docs.aws.amazon.com/xray/latest/api/API_Edge.html)
- [AWS X-Ray](https://aws.amazon.com/xray/)
- [Deep Dive into AWS X-Ray](https://youtu.be/5MQkX57eTh8)
- [AWS X-Ray concepts](https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html)
- [Service graph](https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-servicegraph)
- [Traces](https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-traces)
- [Segments](https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html#xray-concepts-segments)
- [AWS X-Ray pricing](https://aws.amazon.com/xray/pricing/)

## Sections

- [Simple lambda tracing](./step00_simple_lambda_tracing)
- [Lambda with S3 tracing](./step01_lambda_with_s3_tracing)
