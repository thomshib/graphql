import Gender from '../appsync/types/Gender';

async function updateGenderByName(name: string) {
    
    
    try {
        const result : Gender  = {
            count: 1,
            gender: "Male",
            name: "Dummy",
            probability: 1
        }
        return result;
    } catch (err) {
        console.log('update error error: ', err)
    }
}

export default updateGenderByName