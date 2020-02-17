'use strict'

// External Module
const nodemailer = require("nodemailer");
const fs = require('fs');
// var Mailgen = require('mailgen');
const Email = require('email-templates');



// Intern Module
const ElectronGoogleOAuth2Wrapper = require("./ElectronGoogleOAuth2Wrapper");

// String Define
const CLIENT_SSC_PATH = 'googleAPI/client_ssc.json';
const TOKEN_PATH = 'googleAPI/token.json';
const MAIL_SETTINGS_PATH = 'googleAPI/mail_settings.json';
const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/userinfo.email'
];
const dataJSONUserMail = __dirname + "/../src/data/userMail.json";
  
class MailManager {
    constructor() {
        this.AppSettings = JSON.parse(fs.readFileSync(CLIENT_SSC_PATH,'utf-8'));
        this.SavedLastGmailConnection = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
        this.myApiOauth = new ElectronGoogleOAuth2Wrapper(this.AppSettings.client_id, this.AppSettings.client_secret, SCOPES);
        this.getStoredUser();
    }

    getStoredUser() {
        let jsonUserMail = JSON.parse(fs.readFileSync(dataJSONUserMail));
        console.log("json User Mail : ", jsonUserMail.userMail);
        if (jsonUserMail.userMail == undefined)
            jsonUserMail.userMail = ""; 
        this.mailUser = jsonUserMail.userMail;
    }

    mailAvailable() {
        this.getStoredUser();
        if (this.mailUser != undefined && this.mailUser != "")
            return true;
        return false;
    }

    async connectGmailAccount() {
        let mailSet = await this.myApiOauth.openAuthWindowAndGetTokensGmail(this.SavedLastGmailConnection.refresh_token);
        if (mailSet.refreshToken != this.SavedLastGmailConnection.refresh_token)
            fs.writeFileSync(TOKEN_PATH, JSON.stringify({refresh_token: mailSet.refreshToken, access_token: mailSet.accessToken}));
        fs.writeFileSync(MAIL_SETTINGS_PATH, JSON.stringify(mailSet));
        return mailSet;
    }

    sendMail(configMail) {

        let MailSettings = JSON.parse(fs.readFileSync(MAIL_SETTINGS_PATH,'utf-8'));
    
        let mailOptions = {
            from: configMail.from,
            to: "sufyan.kerboua@epitech.eu",
            subject: "Node.js Email with Secure OAuth 2",
            generateTextFromHTML: true,
            html: "<b>Hello there YESSSS MON GARS SURE !!!!!</b>"
        };

        fs.readFileSync
    
        let nodeMailerParams = {
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "sufyan.kerboua2@mail.dcu.ie",
                clientId: MailSettings.clientId,
                clientSecret: MailSettings.clientSecret,
                refreshToken: MailSettings.refreshToken,
                accessToken: MailSettings.accessToken
            }
        }
    
        console.log("NodeMailer Param obj : ", nodeMailerParams);
        console.log("Mail Option obj :", mailOptions)
    
        let smtpTransport = nodemailer.createTransport(nodeMailerParams);
        smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log("Response : ", response);
            smtpTransport.close();
        });
    }

    createMailTemplate() {

        const email = new Email({
          message: {
            from: 'niftylettuce@gmail.com'
          },
          // uncomment below to send emails in development/test env:
          // send: true
          transport: {
            jsonTransport: true
          }
        });
        
        email
          .send({
            template: 'mars',
            message: {
              to: 'elon@spacex.com'
            },
            locals: {
              name: 'Elon'
            }
          })
          .then(console.log)
          .catch(console.error);
        return("<h1>Salut from mailManager</h1>")
    }
}

module.exports = MailManager;