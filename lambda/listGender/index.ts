import Gender from '../appsync/types/Gender';
import AppSyncEvent from '../appsync/types/AppSyncEvent';
import getGender from './getGender';
import getGenderByName from './getGenderByName';
import updateGenderByName from './updateGenderByName';
import { util} from '@aws-appsync/utils'





// export const handler = async(event: AppSyncEvent) => {
//   try{
//     const result = await getGender();
//     return result;  
      
//     }catch(err){
//       console.error(err);
//       return {};
//     }
    
// };



// // works with JS resolver
// exports.handler = async (event, context) => {

//   const url = process.env.URL;
//   console.log('Received event {}', JSON.stringify(event))
//   console.log('Received raw event {}',event);
//   console.log('Received context {}', JSON.stringify(context))
//   console.log("Received URL :", url);
//   console.log("Received event.field :", event.field);
  
//   switch (event.field) {     
//       case "getGender":         
//         return await getGender(event.arguments.name,url);    
//       case "getGenderByName":           
//           return await getGenderByName(event.arguments.name,url);    
//       case "updateGenderByName":
//           return await updateGenderByName(event.arguments.name);
//       default:
//           return null;
//   }
// }

exports.handler = async (event: AppSyncEvent) => {

  const url = process.env.URL;
  console.log('Received raw event ',event);
  console.log('Received raw event stringified ',JSON.stringify(event));
  // console.log('Received event.info ', event.info);
  // console.log('event.info.fieldName ',event.info.fieldName);
  console.log("URL :", url);

  return await getGenderByName(event.arguments.name,url); 
  
  // switch (event.info.fieldName) {     
  //     case "getGender":         
  //       return await getGender(event.arguments.name,url);    
  //     case "getGenderByName":           
  //         return await getGenderByName(event.arguments.name,url);    
  //     case "updateGenderByName":
  //         return await updateGenderByName(event.arguments.name);
  //     default:
  //         return null;
  // }


}
