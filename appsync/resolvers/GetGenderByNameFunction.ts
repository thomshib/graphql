import { util, Context, extensions } from '@aws-appsync/utils'
import AppSyncEvent from '../types/AppSyncEvent';
    
export function request(ctx: Context) {
  
  const newLocal = null;
  const {source, args} = ctx
  
  //  const event : AppSyncEvent = {
  //     info: {
  //           fieldName: "getGenderByName"
  //        },
  //        arguments: {
  //             name: "peter",
  //             gender: newLocal             
  //          },
  //   };

  // const event : AppSyncEvent = {
  //   info: {
  //         fieldName: ctx.info.fieldName
  //      },
  //      arguments: args,
  // };

  const event : AppSyncEvent = {    
    arguments: args,
  };



    return {
      operation: 'Invoke',
      payload:  event,
    };
}

export function response(ctx:Context) {
  console.log(ctx);
  const { error, result } = ctx;
  if (error) {
    return util.appendError(error.message, error.type, result);
  }         
  return result;

}


