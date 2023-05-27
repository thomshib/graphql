import { util, Context, extensions } from '@aws-appsync/utils'

export function request(ctx: Context) {
    return {}
  }

  export function response(ctx: Context) {
    return ctx.prev.result
    
  }

// #set($cachingKeys = {})
// $util.qr($cachingKeys.put("context.arguments.id", $context.arguments.input.id))
// $extensions.evictFromApiCache("Query", "getBlogNoDax", $cachingKeys)
// $util.toJson($context.result)

//  extensions.evictFromApiCache(String, String, Object)

    // Evicts an item from the AWS AppSync server-side cache. 
    // The first argument is the type name. 
    // The second argument is the field name. 
    // The third argument is an object containing key-value pair items that specify the caching key value. 
    // You must put the items in the object in the same order as the caching keys in the 
    // cached resolver's cachingKey