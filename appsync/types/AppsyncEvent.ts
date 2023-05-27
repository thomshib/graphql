import Gender from './Gender';

type AppSyncEvent = {
  info: {
    fieldName: string
 },
  arguments: {
    name: string,
    gender: Gender
 }
}



export default AppSyncEvent;
