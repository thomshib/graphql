import https from 'https';
import Gender from '../appsync/types/Gender';


async function getGenderFromAPI(url: string): Promise<Gender> {
    // console.log("inside API, URL is", url);
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          const gender: Gender = JSON.parse(data);
          resolve(gender);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }
  
  export default getGenderFromAPI