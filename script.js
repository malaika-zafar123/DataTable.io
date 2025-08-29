const table = document.getElementById('userTableBody');
const searchInput = document.querySelector('#searchProduct input');
let allProducts = [];

const maxResultCount = 10;
let currentPage = 1;
const pageContainer = document.getElementById("page");

//  Rating stars
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  return "⭐".repeat(fullStars);
}

//  Search function
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );
  currentPage = 1;
  Table(filteredProducts);
  buildPage(filteredProducts);
});

//  Table 
function Table(products) {
  table.innerHTML = "";
  
  const startIndex = (currentPage - 1) * maxResultCount;
  const endIndex = startIndex + maxResultCount;
  const pageProducts = products.slice(startIndex, endIndex);

  pageProducts.forEach(product => {
    const shortDescription = product.description.length > 50
      ? product.description.slice(0, 50) + "..." : product.description;
      
    const finalPrice = (product.price - (product.price * product.discountPercentage / 100)).toFixed(2);

    const table_row = document.createElement("tr");
    table_row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.title || "--"}</td>
      <td>$${product.price || "--"}</td>
      <td>${product.discountPercentage}%</td>
      <td>$${finalPrice}</td>
      <td>${generateStars(product.rating)}</td>
      <td>${product.brand || "--"}</td>
      <td><img src="${product.thumbnail}" width="60" height="60"></td>
      <td>${shortDescription}</td>
    `;
    table_row.addEventListener("click", () => {
      window.location.href = `singleproduct.html?id=${product.id}`;
    });
    table.appendChild(table_row);
  });
}

// Pagination builder
function buildPage(products) {
  const totalPage = Math.ceil(products.length / maxResultCount);
  
  let pageHTML = `<ul class="pagination justify-content-center mt-4">`;
  
  // Prev button
  pageHTML += `
  <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
    <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
  </li>
  `;
  
  // Page numbers
  for (let i = 1; i <= totalPage; i++) {
    pageHTML += `
    <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
    </li>
    `;
  }

  // Next button
  pageHTML += `
    <li class="page-item ${currentPage === totalPage ? "disabled" : ""}">
      <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
    </li>
  `;
      
  pageHTML += `</ul>`;
  pageContainer.innerHTML = pageHTML;

  // Event listeners
  pageContainer.querySelectorAll(".page-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = parseInt(link.dataset.page);
      if (page >= 1 && page <= totalPage) {
        currentPage = page;
        Table(products);
        buildPage(products);
      }
    });
  });
}

const localData = localStorage.getItem("dummyProducts");

if(localData){
  allProducts = JSON.parse(localData);
  Table(allProducts);
  buildPage(allProducts);
}else{
  fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    allProducts = data.products;
    localStorage.setItem("dummyProducts", JSON.stringify(allProducts));
    Table(allProducts);
    buildPage(allProducts);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
}

// Add Product
document.getElementById("productForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const newProduct = {
    title: document.getElementById("title").value,
    price: parseFloat(document.getElementById("price").value),
    discountPercentage: parseFloat(document.getElementById("discount").value),
    rating: parseFloat(document.getElementById("rating").value),
    brand: document.getElementById("brand").value,
    thumbnail: document.getElementById("thumbnail").value,
    description: document.getElementById("description").value
  };

  fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  })
  .then(res => res.json())
  .then(addedProduct => {
    allProducts.unshift(addedProduct);

    localStorage.setItem("dummyProducts", JSON.stringify(allProducts));

    Table(allProducts);
    buildPage(allProducts);

    alert("Product added successfully!");


    document.getElementById("productForm").reset();
    const modalElement = document.getElementById("productModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  })
  .catch(err => console.error("Error adding product:", err));
});

//  Show modal on button click
document.getElementById("addProductBtn").addEventListener("click", () => {
  const modalElement = document.getElementById("productModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
});

