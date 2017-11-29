var rest = require('../Restclient');
var builder = require('botbuilder');

exports.displayXRate = function getXRate(currencyType, session){
    var url ='https://api.fixer.io/latest';
    rest.getXRate(url,session,currencyType,displayXRate);
}

function displayXRate(message,currencyType,session) {
    var container = [];
    var table = JSON.parse(message);

    //for (var index in table) {
        var base = table.base;
        var date = table.date;
        var test = Object.keys(table.rates);
        var test2 = Object.values(table.rates);
        container.push(base + "<br/>" + date + "<br/>" + test + "<br/>" + test2);
    //}

    session.send(container);
}