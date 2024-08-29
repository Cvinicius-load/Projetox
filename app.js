document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-form')) {
        // Tela de Cadastro
        const form = document.getElementById('product-form');
        const productIdInput = document.getElementById('product-id');
        const productNameInput = document.getElementById('product-name');
        const productPriceInput = document.getElementById('product-price');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const id = productIdInput.value ? parseInt(productIdInput.value) : null;
            const name = productNameInput.value;
            const price = parseFloat(productPriceInput.value);
            const product = { id, name, price };

            const products = JSON.parse(localStorage.getItem('products')) || [];
            if (id) {
                const index = products.findIndex(p => p.id === id);
                products[index] = product;
            } else {
                product.id = Date.now();
                products.push(product);
            }
            localStorage.setItem('products', JSON.stringify(products));
            form.reset();
        });
    } else if (document.getElementById('product-list')) {
        // Tela de Produtos Cadastrados
        const productList = document.getElementById('product-list');

        const loadProducts = () => {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            productList.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${product.name} - R$${product.price.toFixed(2)}
                    <button onclick="editProduct(${product.id})">Editar</button>
                    <button onclick="deleteProduct(${product.id})">Excluir</button>
                `;
                productList.appendChild(li);
            });
        };

        window.editProduct = (id) => {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const product = products.find(p => p.id === id);
            if (product) {
                document.getElementById('product-id').value = product.id;
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-price').value = product.price;
                window.location.href = 'cadastro.html';
            }
        };

        window.deleteProduct = (id) => {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const updatedProducts = products.filter(p => p.id !== id);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            loadProducts();
        };

        loadProducts();
    }
});