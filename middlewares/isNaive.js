const validation = require('../utils/Validation');
const Validation = new validation();

const isNaive = async (req,res,next) => {
    const User = await Validation.getUser(req.cookies.jwt);
    // req.user = User;
    if(User.role == 'naive'){
        next();
    }else{
        return res.status(403).json({message: "Unautharized User"});
    }
}

module.exports = isNaive;