import Gender from '../appsync/types/Gender';
import getGenderFromAPI from './getGenderFromAPI';




async function getGenderByName(name: string, url: string) {
    
    
    try {
        console.log("URL: " , url)
        const result  =  await getGenderFromAPI(url);
        console.log("Result is : " , result)
        return result;
    } catch (err) {
        console.log('API error error: ', err)
    }
}

export default getGenderByName