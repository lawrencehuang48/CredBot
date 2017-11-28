var builder = require('botbuilder');
var bank = require('./Functions');



exports.startDialog = function (bot) {

    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/d4fb21ff-cc42-4648-aa2c-3eb1583eed48?subscription-key=1ba63520afe24644bc75129d6f89e19c&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetBalance', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter your username to view the funds on your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }
                
                session.send("Retrieving your funds...");
                bank.displayBalance(session, session.conversationData["username"]);  
            }
        }

    ]).triggerAction({
        matches: 'GetBalance'
    });


    
}

