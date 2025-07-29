import { google } from 'googleapis'
import dotenv from "dotenv";

dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

console.log(CLIENT_ID,CLIENT_SECRET,'thosnksnniknihnhfuwnn');
export const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    // "postmessage"
)