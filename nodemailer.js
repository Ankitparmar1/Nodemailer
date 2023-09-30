const nodemailer = require("nodemailer");
const googleApis = require("googleapis");
const REDIRECT_URI = `https://developers.google.com/oauthplayground`;
const CLIENT_ID = `688349033936-ecgjknlepmcum6hh7kvibeojjc6l39ee.apps.googleusercontent.com`;
const CLIENT_SECRET = `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`;
const REFRESH_TOKEN = `1//04svUh_nhwrQlCgYIARAAGAQSNwF-L9Ir1xtrJRLbYDI5fMUtagt9sv-SbNE8vmRXPUyh7JjrPxZd2cIzb3oRZHNZaElNrg6pVuo`;

const authClient = new googleApis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET,
    REDIRECT_URI);
authClient.setCredentials({ refresh_token: REFRESH_TOKEN });
async function mailer() {
    try {
        const ACCESS_TOKEN = await authClient.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "tankit8661@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN
            }
        })
        const details = {
            from: "Ankit Parmar<tankit8661@gmail.com>",
            to: "ankuparmar2000@gmail.com",
            subject: "using nodemailer",
            text: "message text",
            html: "Hello dost🥰❤️‍🔥",
        }
        const result = await transport.sendMail(details);
        return result;
    }
    catch (err) {
        return err;
    }
}
mailer().then(res => {
    console.log("sent mail !", res);
})

module.exports = ("nodemailer");