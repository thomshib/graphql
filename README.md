# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


* Appsync npm modules

npm install aws-cdk-lib@2.67.0 --save-exact

npm i @aws-appsync/utils


* CodeGen Dependencies
npm i @graphql-codegen/cli @graphql-codegen/typescript @types/aws-lambda  -D

* Run code gen

add "codegen": "graphql-codegen" to you package.json under the "scripts" section, 
and use 

* esbuild to convert TS to JS

 Dependencies
 npm i --save-exact esbuild
 npm i --save-exact  glob 

 Run
 npm run bundle


run for 
appsync/resolvers/appHelloWorldFunction.js 
&
appsync/resolvers/pipelineResolver.js



 esbuild --bundle \
--sourcemap=inline \
--sources-content=false \
--target=esnext \
--platform=node \
--format=esm \
--external:@aws-appsync/utils \
--outdir=out/appsync \
 appsync/resolvers/pipelineResolver.js


npm run codegen

* Amplify codegen using cli

* Limitations
    AppSyncFunctions do not support Typescript.
    Use esbuild based approach to convert Typescript to JS

* Caching
  Per resolver
  

* Tests
  CLI  :
    $ aws appsync evaluate-code \
    --code file://out/appsync/resolvers/GetGenderByNameFunction.js \
    --function response \
    --context file://test/context.json \
    --runtime name=APPSYNC_JS,runtimeVersion=1.0.0

  JEST 
    npm run test

  Dependencies
  npm i --save-exact  aws-sdk 

  Limitations
