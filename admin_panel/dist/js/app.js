      const product_Name = document.getElementById('product_name');
      const product_price = document.getElementById('product_price');
      function SendData() {
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