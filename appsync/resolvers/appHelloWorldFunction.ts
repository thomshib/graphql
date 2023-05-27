import { util, Context, extensions } from '@aws-appsync/utils'
    
export function request(ctx:Context) {
    return {
        "operation": "Invoke",
        "payload": ctx.args
    };
}

export function response(ctx: Context) {
  console.log(ctx);
  const { error, result } = ctx;
  if (error) {
    return util.appendError(error.message, error.type, result);
  }         
  return result;

}


