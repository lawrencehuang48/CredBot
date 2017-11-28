var rest = require('../Restclient');

exports.displayBalance = function getBalance(session, username){
    var url = 'https://CredBot.azurewebsites.net/tables/CredBot';
    rest.getBalance(url, session, username, handleDisplayFundsResponse)
};



function handleDisplayFundsResponse(message, session, username) {
    var table = JSON.parse(message);
    var allAccounts = [];
    for (var column in table) {
        var usernameReceived = table[column].username;
        var balance = table[column].balance;
        var account = table[column].account;
        var cardtype = table[column].cardtype;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase() && !cardtype) {
            if(table.length - 1) {
                allAccounts.push("***" + account + "***" + ":\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + balance + "<br/>");
                
            }
            else {
                allAccounts.push(balance);
            }
        }        
    }
    var output = allAccounts.join(" ");
    
    // Print out the balance of all the user's current bank accounts
    session.send("%s, your account balance is: <br/> %s", username, output,);             
    
}



