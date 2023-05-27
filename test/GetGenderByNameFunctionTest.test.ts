// const AWS = require('aws-sdk');
// const fs = require('fs');
// const client = new AWS.AppSync({ region: 'ap-south-1' });


// test('request correctly calls Lambda', async () => {
//   try{
//   const runtime = {name:'APPSYNC_JS',runtimeVersion:'1.0.0'};
//   const code = fs.readFileSync('out/appsync/resolvers/GetGenderByNameFunction.js', 'utf8')
//   const context = fs.readFileSync('test/GetGenderByNameContext.json', 'utf8')
//   const contextJSON = JSON.parse(context)
//   // console.log("From context: ", contextJSON.arguments.name);
  
//   const response = await client.evaluateCode({ code, context, runtime, function: 'response' }).promise()
//   // console.log(response);
//   const result = JSON.parse(response.evaluationResult)
//   //  console.log(result);
//   // console.log("From result: ",result.name); 
  
//    expect(result.name).toEqual(contextJSON.arguments.name)
//   }catch(err){
//     console.log(err);
//   }
// })

import { AppSyncClient, EvaluateCodeCommand } from "@aws-sdk/client-appsync"; 
import * as fs from 'fs';
import Gender from '../appsync/types/Gender';


test('request correctly calls Lambda', async () => {
  const client = new AppSyncClient({ region: 'ap-south-1' });


  const runtimeVersion = "1.0.0";
  const code = fs.readFileSync('out/appsync/resolvers/GetGenderByNameFunction.js', 'utf8')
  const context = fs.readFileSync('test/GetGenderByNameContext.json', 'utf8')
  const contextJSON = JSON.parse(context)
  const functionName = "response";

  const input = { // EvaluateCodeRequest
    runtime: { // AppSyncRuntime
      name: "APPSYNC_JS", // required
      runtimeVersion: runtimeVersion, // required
    },
    code: code, // required
    context: context, // required
    function: functionName,
  };
  const command = new EvaluateCodeCommand(input);
  const response = await client.send(command);   
  const result: Gender = JSON.parse(response.evaluationResult!);
  expect(result.name).toEqual(contextJSON.arguments.name)

})


