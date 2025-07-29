import { oauth2client } from "../utils/googleConfig.js"

export const googleController = async (req, res) => {

    try {

        const { code } = req.query
        const googleRes = await oauth2client.getToken(code)
        oauth2client.setCredentials(googleRes.tokens)
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        res.send(userRes)
    }
    catch (err) {
        console.log(err);
    }
}