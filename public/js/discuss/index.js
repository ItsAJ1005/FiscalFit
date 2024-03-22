const loginButton = document.getElementById('log-in');
const logoutButton = document.getElementById('log-out');
var loginPage = document.getElementById('loginPage');
loginPage.style.display = "none";

if(logoutButton){
    logoutButton.addEventListener('click',(e)=>{
        fetch('../api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                window.location.href = '/discuss'; 
            } else {
                console.error('Logout request failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Logout request error:', error);
        }); 
    });
}

if(loginButton){
    loginButton.addEventListener('click',()=>{
        if(loginPage.style.display == "none")
            loginPage.style.display = "block";
    })
}

window.addEventListener('click', function(e){
    if(loginButton === null || loginButton.contains(e.target)){
        return;
    }
    var loginPage = document.getElementById('loginPage');
    if (loginPage.contains(e.target)){
    } else {
        if(loginPage.style.display == "block") {
            loginPage.style.display = "none";
        }   
    }
});
