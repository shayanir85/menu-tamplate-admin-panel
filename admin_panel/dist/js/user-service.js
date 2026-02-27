const Name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');

function login(){
    axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
}

function register(){
    axios.post('http://127.0.0.1:8000/api/register', {
      name: Name.value,
      email: email.value,
      password: password.value
    })
      .then(response => {
        console.log(response);
        
      })
      .catch(error => {
        console.log(error);
      });
}