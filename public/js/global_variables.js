var LoggedIn = false;

function setLoggedIn(value){
    LoggedIn = value;
}

module.exports = {
    LoggedIn: LoggedIn,
    setLoggedIn: setLoggedIn
};