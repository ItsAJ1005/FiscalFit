const jwt = require('jsonwebtoken')

const requirAuth = (req , res , next)=>{
    token = req.cookies.jwt ;

    if(token){
        jwt.verify(token , 'Port-folio-hulala' , (err , decodedToken)=>{
            if(err){
                console.error(err.mesg)
            }
            else{
                console.error(decodedToken);
                next();
            }
        })
    }else{
        console.error(middlewareErr);
    }
}

module.export = { requirAuth }