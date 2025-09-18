import { googleApi } from "./googleApi"

export const responseGoogle = async (authResult) => {
    console.log(authResult,'auth');
    try {
        if(authResult['code']){
const result = await googleApi(authResult['code'])
console.log(result,'redd');
        }
    }
    catch (err) {
        console.log(err)
    }
}