// import axios from '../node_modules/axios/dist/esm/axios.js';

      const product_Name = document.getElementById('product_name');
      const product_price = document.getElementById('product_price');
      const container = document.getElementById('products-list-container');

      document.addEventListener('DOMContentLoaded', function() {
      console.log('product-service.js loaded');
      getProducts();
      });

      function SendProduct() {
        axios.post('http://127.0.0.1:8000/api/products', {
          name: product_Name.value,
          price: product_price.value
        })
          .then(response => {
            console.log(response);
            getProducts();
          })
          .catch(error => {
            console.log(error);
          });
      }

      function getProducts(){
          axios.get('http://127.0.0.1:8000/api/products')
          .then(response => {
            
            
            const items = response.data;
            

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
                    <div class="product-actions" style="margin-top: 10px;">
                      <button class="btn btn-primary btn-xs" onclick="EditProduct(${item.id})">
                        <i class="fa fa-edit"></i> ویرایش
                      </button>
                      <button class="btn btn-danger btn-xs" onclick="deleteProduct(${item.id})">
                        <i class="fa fa-trash-o"></i> حذف
                      </button>
                    </div>
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

      function deleteProduct(id) {
        if (confirm('آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟')) {
          axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
            .then(response => {
              console.log(response);
              getProducts();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }

      function EditProduct(id) {
          axios.put(`http://127.0.0.1:8000/api/products/${id}/edit`)
            .then(response => {
              console.log(response);
              const link = 'http://127.0.0.1:5500/admin_panel/';
              window.location.href = `${link}UpdateProduct.html`;
            })
            .catch(error => {
              console.log(error);
            });
        
      }
