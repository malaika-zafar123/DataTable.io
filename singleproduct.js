const id = new URLSearchParams(window.location.search).get("id");

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  return "⭐".repeat(fullStars);
}

if (!id) {
  alert("Id not found!");
} else {
  fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      console.log(product);

      const finalPrice = (product.price - product.price * product.discountPercentage / 100).toFixed(2);

      
      document.getElementById("title").textContent = product.title;
      document.getElementById("brand").textContent = product.brand;
      document.getElementById("description").textContent = product.description;
      document.getElementById("price").textContent = "$" + product.price;
      document.getElementById("discount").textContent = product.discountPercentage + "% off";
      document.getElementById("finalPrice").textContent = "$" + finalPrice;
      document.getElementById("stock").textContent = product.stock;
      document.getElementById("rating").textContent = product.rating;
      document.getElementById("warranty").textContent = product.warrantyInformation || "No warranty info";
      document.getElementById("shipping").textContent = product.shippingInformation || "Standard shipping";
      document.getElementById("returnPolicy").textContent = product.returnPolicy || "No return policy";

    
      let images = [product.thumbnail, ...product.images]; 
      let carouselItems = images.map((img, i) => `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img src="${img}" class="d-block w-100 rounded shadow" style="max-height:400px;object-fit:contain;">
        </div>
      `).join("");

      document.getElementById("imageCarousel").innerHTML = `
        <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${carouselItems}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      `;

      if (product.reviews && product.reviews.length > 0) {
        let reviewItems = product.reviews.map((r, i) => `
          <div class="carousel-item ${i === 0 ? 'active' : ''}">
            <p><strong>${r.reviewerName}</strong> ${generateStars(r.rating)}</p>
            <p>"${r.comment}"</p>
            <p><strong>Email:</strong> ${r.reviewerEmail}</p>
          </div>
        `).join("");

        document.getElementById("reviewsCarousel").innerHTML = `
          <div id="reviewCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner text-center">
              ${reviewItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#reviewCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#reviewCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>
          </div>
        `;
      } else {
        document.getElementById("reviewsCarousel").innerHTML = `<p class="text-center">No reviews available</p>`;
      }

    })
    .catch(err => {
      console.error("Error:", err);
      alert("Could not load product data.");
    });
}
