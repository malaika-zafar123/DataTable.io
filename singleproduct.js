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
          console.log(product)
          const finalPrice = (product.price - product.price * product.discountPercentage / 100).toFixed(2);

          document.getElementById("mainImage").src = product.images[0];
          document.getElementById("thumbnail").src = product.thumbnail;
          document.getElementById("title").textContent = product.title;
          document.getElementById("brand").textContent = product.brand;
          document.getElementById("description").textContent = product.description;
          document.getElementById("price").textContent = "$" + product.price;
          document.getElementById("discount").textContent = product.discountPercentage + "% off";
          document.getElementById("finalPrice").textContent = "$" + finalPrice;
          document.getElementById("stock").textContent = product.stock;
          document.getElementById("rating").textContent = product.rating ;
        })
        .catch(err => {
          console.error("Error:", err);
          alert("Could not load product data.");
        });
    }
