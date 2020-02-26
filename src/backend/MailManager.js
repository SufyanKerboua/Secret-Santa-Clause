'use strict'

// External Module
const nodemailer = require("nodemailer");
const fs = require('fs');
const ejs = require('ejs');
const request = require('request');

// Intern Module
const ElectronGoogleOAuth2Wrapper = require("./ElectronGoogleOAuth2Wrapper");

// String Define
const CLIENT_SSC_PATH = 'googleAPI/client_ssc.json';
const TOKEN_PATH = 'googleAPI/token.json';
const MAIL_SETTINGS_PATH = 'googleAPI/mail_settings.json';
const SCOPES = [
  'https://mail.google.com/'
];
const API_KEYS = 'AIzaSyDtNX0pft0tStJcEq4QTKpUS3pRQj1SQ4w';
const URL_EMAIL_PROFILE = 'https://www.googleapis.com/gmail/v1/users/me/profile?key=';
const pathTemplateMail1 = __dirname + "/../template-mails/mail.ejs";
  
class MailManager {
    constructor() {
        this.AppSettings = JSON.parse(fs.readFileSync(CLIENT_SSC_PATH,'utf-8'));
        this.SavedLastGmailConnection = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
        this.myApiOauth = new ElectronGoogleOAuth2Wrapper(this.AppSettings.client_id, this.AppSettings.client_secret, SCOPES);
        this.emailUser = '';
    }

    mailAvailable() {
        if (this.emailUser != undefined && this.emailUser != '')
            return true;
        return false;
    }

    doRequestEmailUserToGmail(accessToken) {
        return new Promise(function (resolve, reject) {
            request(URL_EMAIL_PROFILE + API_KEYS, { headers : { "Authorization" : 'Bearer ' + accessToken, "Accept": 'application/json'}}, (err, res, body) => {
                if (err) { 
                    console.log('Error ==>>', err);
                    reject('');
                }
                let emailUserFromGmail = JSON.parse(body).emailAddress;
                console.log("Email from : ", emailUserFromGmail);
                resolve(emailUserFromGmail);
            });
        })
    }

    async connectGmailAccount() {
        let mailSet = await this.myApiOauth.openAuthWindowAndGetTokensGmail(this.SavedLastGmailConnection.refresh_token);
        if (mailSet.refreshToken != this.SavedLastGmailConnection.refresh_token)
            fs.writeFileSync(TOKEN_PATH, JSON.stringify({refresh_token: mailSet.refreshToken, access_token: mailSet.accessToken}));
        fs.writeFileSync(MAIL_SETTINGS_PATH, JSON.stringify(mailSet));

        this.emailUser = await this.doRequestEmailUserToGmail(mailSet.accessToken);
        return mailSet;
    }

    // Remove all occurence of a specific value in the potential value array specificValue
    removeAllPotentialValueOfSpecificValue(sudokuArray, participantToRemove) {
        // Loop through all participant array (named sudoku) to access the array of potential value
        for (let y = 0; y < sudokuArray.length; y++) {
            // If the value is an array & contains the value we want to remove, we access
            if (Array.isArray(sudokuArray[y][sudokuArray[y].length - 1]) && 
            (sudokuArray[y][sudokuArray[y].length - 1].includes(participantToRemove))) {
                // Remove only the specific value of the potential array
                sudokuArray[y][sudokuArray[y].length - 1] = sudokuArray[y][sudokuArray[y].length - 1].filter(e => e !== participantToRemove);
            }
        }
    }

    // Recursive function
    assignParticipantFromPotentialValues(sudokuArray, participantToAssign) {
        // Loop all sudoku participant Array
        for (let y = 0; y < sudokuArray.length; y++) {
            // If the value is an array & this array contains the value we want to assign to the index, we access
            if (Array.isArray(sudokuArray[y][sudokuArray[y].length - 1]) && 
            (sudokuArray[y][sudokuArray[y].length - 1].includes(participantToAssign))) {
                // potentialValues => is the Array of all the potential participants that can be assigned to the index
                // Get the potentialValues under the shape of an array
                let potentialValues = sudokuArray[y][sudokuArray[y].length - 1];
                // Assign the Participant to the specific index
                sudokuArray[y][sudokuArray[y].length - 1] = participantToAssign;
                // Remove the previous Participant how saw assigned (here the value participantToAssign)
                potentialValues = potentialValues.filter(e => e !== participantToAssign);
                // Remove the name of this participant from all other Potencial array 
                this.removeAllPotentialValueOfSpecificValue(sudokuArray, participantToAssign);
                // Assign the next participant of the potencial values (so recursive beginning)
                this.assignParticipantFromPotentialValues(sudokuArray, potentialValues[0]);
            }
        }
    }

    // Randomly find all the target participant for each participant
    // For those assignements, we use the sudoku method to assign a target participant
    randomlyAssignParticipant(allParticipants, simpletabRefParticipant) {

        // Create array to represent all our participants not assigned throught the shape of an array (inspired of the sudoku method)
        let sudokuArray = [];
        // Select only the relevant data from our previous Array<Object>
        allParticipants.forEach(elem => {
            sudokuArray.push(elem.not_assigned_participant);
        });
        // Assign all potential values
        for (let y = 0; y < sudokuArray.length; y++) {
            let arrayPotentialValues = [];
            // Thanks to an array where all names of participant is stored (simpletabRefParticipant)
            // We can create an array of potential names for each participant
            simpletabRefParticipant.forEach(elem => {
                if (!sudokuArray[y].includes(elem))
                    arrayPotentialValues.push(elem);
            });
            sudokuArray[y].push(arrayPotentialValues);
        }
        // SO sudokuArray looks like 
        // [ [ participant1, participant2, [ potentialParticipant1, potentialParticipant2 ] ] ]
        // sudokuArray = [[ <string>, [<string>] ]]

        // Transform all PotentialParticipant into concret pparticipant, throuht recursive fct
        this.assignParticipantFromPotentialValues(sudokuArray, simpletabRefParticipant[0]);
        // console.log("Final Array : ", sudokuArray);

        // Bind each Participant to his target Participant
        let bindedParticipants = [];
        sudokuArray.forEach((elem, index) => {
            if (Array.isArray(elem[elem.length - 1]))
                bindedParticipants.push({participant: simpletabRefParticipant[index], assigned_participant: elem[elem.length - 1][0]});
            else
                bindedParticipants.push({participant: simpletabRefParticipant[index], assigned_participant: elem[elem.length - 1]});
        });
        return bindedParticipants;
    }

    // Render all HTML body of each participant with his own data
    renderHTMLMail(configMailGroup) {

        let allParticipants = configMailGroup.groupObj.participants;

        // Fill a basic Object, that reresent the configuration of each HTML Mail for each paticipant
        // With the data send from the MailPreview
        let configMailHtml = {
            group_name: configMailGroup.mailContentBasic.group_name,
            participant: '',
            assigned_participant: '',
            date: configMailGroup.mailContentBasic.date,
            places: configMailGroup.mailContentBasic.places,
            time: configMailGroup.mailContentBasic.time
        }
        // Get the templated HTML Mail body
        let htmlMailIncomplete = fs.readFileSync(pathTemplateMail1, 'utf-8');

        // Create a simple array to resume all participants
        let tabRefParticipant = [];
        allParticipants.forEach(el => {
            tabRefParticipant.push(el.participant_name)
        });

        // Get an Array of binded Participant with his target Participant
        // bindedParticipants = [{participant: string, assigned_participant: string}]
        let bindedParticipants = this.randomlyAssignParticipant(allParticipants, tabRefParticipant);

        // Fill all the htmlMailsGroup Array, with an object of :
        // [ { mailDest: string, assigned_participant: string, htmlMail: string } ]
        let htmlMailsGroup = [];
        allParticipants.forEach(participant => {

            // Find the good assigned participant for this index
            let assigned_participant = bindedParticipants.find(elem => elem.participant == participant.participant_name).assigned_participant;
            // Configure the configMailHtml object
            configMailHtml.participant = participant.participant_name;
            configMailHtml.assigned_participant = assigned_participant;
            // Render the Html Body of the page
            let htmlMail = ejs.render(htmlMailIncomplete, configMailHtml, {delimiter: '?'});
            // Push the new object to the htmlMailsGroup Array
            htmlMailsGroup.push({mailDest: participant.mail, assigned_participant: assigned_participant, htmlMail: htmlMail});
        });

        // console.log("========= ALL Mails + html =============== =>\n", htmlMailsGroup);
        return htmlMailsGroup;
    }

    sendMail(configMailGroup) {

        // Render All mails for each Participants
        // [ { mailDest: string, assigned_participant: string, htmlMail: string } ]
        let allHTMLMailsDest = this.renderHTMLMail(configMailGroup);

        // Get Previous token stored from the Gmail connection
        // {clientId, clientSecret, refreshToken, accessToken}
        let MailSettings = JSON.parse(fs.readFileSync(MAIL_SETTINGS_PATH,'utf-8'));
        // Get ths previous mail stored from the user
        // let userMail = JSON.parse(fs.readFileSync(dataJSONUserMail,'utf-8'));
        let userMail = this.emailUser;
    
        // Configure NodeMailerParams Object 
        let nodeMailerParams = {
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: userMail,
                clientId: MailSettings.clientId,
                clientSecret: MailSettings.clientSecret,
                refreshToken: MailSettings.refreshToken,
                accessToken: MailSettings.accessToken
            }
        }
    
        // Configure the basic options for each mail
        let mailOptions = {
            from: 'Secret Santa Clause <' + userMail.userMail + '>',
            to: '',
            subject: 'Secret Santa Clause Assignment',
            generateTextFromHTML: true,
            html: ''
        };

        // console.log("All Mails : ", allHTMLMailsDest);

        //Loop to send email to everyone
        let smtpTransport = nodemailer.createTransport(nodeMailerParams);
        allHTMLMailsDest.forEach(elem => {

            mailOptions.to = elem.mailDest;
            mailOptions.html = elem.htmlMail;
            
            smtpTransport.sendMail(mailOptions, (error, response) => {
                error ? console.log(error) : console.log("Response : ", response);
                smtpTransport.close();
            });
        });

        // console.log("NodeMailer Param obj : ", nodeMailerParams);
    
    }

    // createMailTemplate() {
    //     return("<h1>Salut from mailManager</h1>")
    // }
}

module.exports = MailManager;