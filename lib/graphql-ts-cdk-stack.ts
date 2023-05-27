import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import  {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'; 
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as path from 'path';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { Authorizer } from 'aws-cdk-lib/aws-apigateway';


export class GraphqlTsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    
      // 2. setup a static expiration date for the API KEY
      const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
      const WORKSHOP_DATE = new Date() // date of this workshop
      WORKSHOP_DATE.setHours(0)
      WORKSHOP_DATE.setMinutes(0)
      WORKSHOP_DATE.setSeconds(0)
      WORKSHOP_DATE.setMilliseconds(0)
      const KEY_EXPIRATION_DATE = new Date(WORKSHOP_DATE.getTime() + SEVEN_DAYS)

          

    const api = new appsync.GraphqlApi(this, 'DemoAPI', {
      name: 'DemoAPI',
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
      },
      // 3. a. create schema using our schema definition
      schema: appsync.SchemaFile.fromAsset('appsync/schema/schema.graphql'),
      // authorizationConfig: {
      //   defaultAuthorization: {
      //     authorizationType: appsync.AuthorizationType.API_KEY,
      //     apiKeyConfig: {
      //       expires: cdk.Expiration.atDate(KEY_EXPIRATION_DATE)
      //     }
      //   },
      // },
      xrayEnabled: true
    })


    // Enable Caching
    const cfnApiCache = new appsync.CfnApiCache(this, 'DemoAPICache', {
      apiCachingBehavior: 'PER_RESOLVER_CACHING',
      apiId: api.apiId,
      ttl: cdk.Duration.seconds(30).toSeconds(), // cache for 30 seconds as default
      type: 'SMALL',      
      // the properties below are optional
      atRestEncryptionEnabled: false,
      transitEncryptionEnabled: false,
    });
   
    const getGenderLambda = new NodejsFunction(this, 'demoget', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',    
      entry: path.join(__dirname, `/../lambda/listGender/index.ts`),
      environment: {
        URL: "https://api.genderize.io/?name=peter"       
      }
    });


    const updGenderLambda = new NodejsFunction(this, 'demoupd', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',    
      entry: path.join(__dirname, `/../lambda/updateGender/index.ts`),
      environment: {
        URL: "https://api.genderize.io/?name=peter"       
      }
    });

    

     // 6. Define resolvers
    

     //const pipelineReqResCode = appsync.Code.fromAsset("appsync/resolvers/pipelineResolver.js")

     const pipelineReqResCode = appsync.Code.fromAsset("out/appsync/resolvers/pipelineResolver.js")

     const getGenderLambdaSource = api.addLambdaDataSource(
       'lambdaQuerySource',    
       getGenderLambda
     )

     const updGenderLambdaSource = api.addLambdaDataSource(
      'lambdaMutationSource',    
      updGenderLambda
    )


     // unit resolvers

    
    //  getGenderLambdaSource.createResolver("GetGender",{
    //   typeName: "Query",
    //   fieldName: "getGender"
    //  }
    // );


    // // Add the caching keys to a Query resolver
    //  lambdaSource.createResolver("GetGenderByName",{
    //   typeName: "Query",
    //   fieldName: "getGenderByName",
    //   cachingConfig: {
    //     ttl: cdk.Duration.seconds(30),
    //     cachingKeys: ["$context.arguments.name"]
    //   }
    //  }
    // );

    //2. 
    //  We define a request and a response resolver. 
    //  clear the entry from the cache in the response mapping template
    // use the new extensions utility to evict the cache entries any time that the 
    // gender information  is updated

    const pipelineReqResCodeWithCacheEviction = appsync.Code.fromAsset("appsync/resolvers/pipelineReqResCodeWithCacheEviction.js")

    updGenderLambdaSource.createResolver("Mutation",{
      typeName: "Mutation",      
      fieldName: "updateGenderByName",
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
      #set($cachingKeys = {})
      $util.qr($cachingKeys.put("context.arguments.name", $context.arguments.name))
      $extensions.evictFromApiCache("Query", "getGenderByName", $cachingKeys)
      $util.toJson($context.result)    
      `),
      }
    );


      //pipeline resolvers do not directly work with typescript

    // const appFunction1 = lambdaSource.createFunction('appFunction1', {
    //   name: 'helloWorld',
    //   //code: appsync.Code.fromAsset("appsync/resolvers/appHelloWorldFunction.js"), 
    //   code: appsync.Code.fromAsset("out/appsync/resolvers/appHelloWorldFunction.js"),
    //   runtime: appsync.FunctionRuntime.JS_1_0_0,
     
    // })

    const appGetGenderByNameFunction = getGenderLambdaSource.createFunction('GetGenderByNameFunction', {
        name: 'GetGenderByNameFunction',
        // code: appsync.Code.fromAsset("appsync/resolvers/GetGenderByNameFunction.js"), 
        code: appsync.Code.fromAsset("out/appsync/resolvers/GetGenderByNameFunction.js"),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
       
      })

    api.createResolver('GetGenderByName', {
      typeName: 'Query',
      fieldName: 'getGenderByName',
      code: pipelineReqResCode,
      cachingConfig: {
        ttl: cdk.Duration.seconds(30),
        cachingKeys: ["$context.arguments.name"]
      },
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [appGetGenderByNameFunction]
    })

      
  
    
    // api.createResolver('HelloWorld', {
    //   typeName: 'Query',
    //   fieldName: 'getGender',
    //   code: pipelineReqResCode,
    //   runtime: appsync.FunctionRuntime.JS_1_0_0,
    //   pipelineConfig: [appFunction1]
    // })
 
      // 7. Stack Outputs
      new cdk.CfnOutput(this, 'GraphQLAPI_ID', { value: api.apiId })
      new cdk.CfnOutput(this, 'GraphQLAPI_URL', { value: api.graphqlUrl })
      // new cdk.CfnOutput(this, 'GraphQLAPI_KEY', { value: api.apiKey })
      new cdk.CfnOutput(this, 'STACK_REGION', { value: this.region })


  }
}
