const loginButton = document.getElementById('log-in');
const logoutButton = document.getElementById('log-out');
var loginModal = document.getElementById('loginModal');
loginModal.style.display = "none";

if(logoutButton){
    logoutButton.addEventListener('click',(e)=>{
        fetch('../api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
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
        if(loginModal.style.display == "none")
            loginModal.style.display = "block";
    })
}

window.addEventListener('click', function(e){
    if(loginButton === null || loginButton.contains(e.target)){
        return;
    }
    var loginModal = document.getElementById('loginModal');
    if (loginModal.contains(e.target)){
    } else {
        if(loginModal.style.display == "block") {
            loginModal.style.display = "none";
        }   
    }
});
