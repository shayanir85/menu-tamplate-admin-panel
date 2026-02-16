      const product_Name = document.getElementById('product_name');
      const product_price = document.getElementById('product_price');
      const Name = document.getElementById('name');
      const email = document.getElementById('email');
      const password = document.getElementById('password');

      function SendProduct() {
        axios.post('http://127.0.0.1:8000/api/products', {
          name: product_Name.value,
          price: product_price.value
        })
          .then(respond => {
            console.log(respond);
          })
          .catch(error => {
            console.log(error);
          });
      }
      function login(){
        axios.post('http://127.0.0.1:8000/api/login', {
          email: email.value,
          password: password.value
        })
          .then(respond => {
            console.log(respond);
          })
          .catch(error => {
            console.log(error);
          });
      }
      function register(event){
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register', {
          name: Name.value,
          email: email.value,
          password: password.value
        })
          .then(respond => {
            console.log(respond);
          })
          .catch(error => {
            console.log(error);
          });
      }