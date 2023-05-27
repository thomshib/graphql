import Gender from '../appsync/types/Gender';
import getGenderFromAPI from './getGenderFromAPI';



// async function getGender(url: string): Promise<Gender> {
 
//   return new Promise((resolve, reject) => {
//     https.get(url, (res) => {
//       let data = '';

//       res.on('data', (chunk) => {
//         data += chunk;
//       });

//       res.on('end', () => {
//         const gender: Gender = JSON.parse(data);
//         resolve(gender);
//       });
//     }).on('error', (err) => {
//       reject(err);
//     });
//   });
// }

async function getGender(name: string, url: string) {
    try {
        console.log("URL: " , url)
        const result  =  await getGenderFromAPI(url);
        console.log("Result is : " , result)
        return result;
        
        
    } catch (err) {
        console.log('API error error: ', err)
    }
}

export default getGender