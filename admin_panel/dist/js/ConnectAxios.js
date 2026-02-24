// import axios from '../node_modules/axios/dist/esm/axios.js';

      const product_Name = document.getElementById('product_name');
      const product_price = document.getElementById('product_price');
      const Name = document.getElementById('name');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const container = document.getElementById('products-list-container');

      document.addEventListener('DOMContentLoaded', function() {
      console.log('ConnectAxios.js loaded');
      getProducts();
      });

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
            console.log(respond.data);
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
          .then(respond => {
            console.log(respond);
          })
          .catch(error => {
            console.log(error);
          });
      }
      function getProducts(){
          axios.get('http://127.0.0.1:8000/api/products')
          .then(respond => {
            
            
            const items = respond.data;
            

            let html = ``;
            console.log(items);
            items.forEach((item, index )=> {
              html += `
                  <li class="item">
                  <!-- تصویر محصول -->
                  <div class="product-img">
                    <img src="${item.img}" alt="Product Image">
                  </div>
                  <!-- اطلاعات محصول شامل عنوان و قیمت -->
                  <div class="product-info">
                    <a class="product-title"> ${item.name}
                      <span class="label label-warning pull-left">${item.price} تومان</span></a>
                    <span class="product-description">
                    ${item.description}
                    </span>
                  </div>
                </li>
              ` ; 
            });

            container.innerHTML = html;
          })

          .catch(error => {
            console.log(error);
          });
      }