const jwt = require('jsonwebtoken')

const requirAuth= (req , res , next)=>{
    token = req.cookies.jwt ;

    if(token){
        jwt.verify(token , 'Port-folio-hulala' , (err , decodedToken)=>{
            if(err){
                console.log(err.mesg)
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        console.log(middlewareErr);
    }
}

module.export = {requirAuth}