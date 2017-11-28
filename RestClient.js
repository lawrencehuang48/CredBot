var request = require ('request');

exports.getBalance = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username);
        }
    });
};

//Creating the REST call
exports.addCardToAccount = function getData(url, username, cardtype, linkedto){ //Sending data to server via the parameters
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',        //POSTMAN headers
            'Content-Type':'application/json'
        },
        json: {
            "username" : username,
            "cardtype" : cardtype,
            "linkedto" : linkedto
        }
      };
      
      request(options, function (error, response, body) {   //Parameters provided by request function
        if (!error && response.statusCode === 200) {        //Executing from response, 200 = OK
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};




