//const APIKEY = "2abbf7c3-245b-404f-9473-ade729ed4653";

const {TOKEN} = require('./../config')

function validateApiKey(req,res,next)
{
    if (!req.headers.authorization)
    {
        res.statusMessage = "Unathorized Message. Please send the APIKEY"
        return res.status(401).end();      
    }

    if(req.headers.authorization !== `Bearer ${TOKEN}`){
        res.statusMessage = "Unathorized Request. Invalid APIKEY"
        return res.status(401).end();   
    }

    next();
    
}

module.exports = validateApiKey;
