// منتظر می‌مانیم تا صفحه کاملاً بارگذاری شود
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('product_search');

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    const products = document.querySelectorAll('#products-list-container .item');

    products.forEach(function(product) {
      const title = product.querySelector('.product-title').textContent.toLowerCase();
      const description = product.querySelector('.product-description').textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        product.style.display = '';
      } else {
        product.style.display = 'none';
      }
    });
  });
});
