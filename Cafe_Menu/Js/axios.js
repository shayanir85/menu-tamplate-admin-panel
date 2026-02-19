import axios from '../node_modules/axios/dist/esm/axios.js';
axios.get('http://127.0.0.1:8000/api/products')
    .then(response => {
        console.log(response.data);
        })
        .catch(error => {
            console.error('خطا در دریافت محصولات:', error);
        });