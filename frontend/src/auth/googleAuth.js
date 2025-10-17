import { googleApi } from "./googleApi"

export const responseGoogle = async (authResult) => {
    console.log(authResult,'auth');
    try {
        if(authResult['code']){
const result = await googleApi(authResult['code'])
        }
    }
    catch (err) {
        console.log(err)
    }
}