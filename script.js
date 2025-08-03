
// const table = document.getElementById('userTableBody');
// function generateStars(rating){
//   const fullStars = Math.floor(rating);
//   let stars = "⭐".repeat(fullStars);
//   return stars;
// }

// fetch('https://dummyjson.com/products')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     const products = data.products;
    
//     const tableBody = document.getElementById('userTableBody');
//     products.forEach(product => {
// const shortDescription = product.description.length > 50 ?
// product.description.slice(0,50) +"...."+ product.description;

//       tableBody.innerHTML += `<tr>
//                <td>${product.id}</td>
//                <td>${product.title}</td>
//                <td>${product.description}</td>
//                 <td>${generateStars(rating)}</td>
//                <td>${product.price}</td>
//                <td>${product.brand}</td>
//                <td>${product.category}</td>
//                </tr>
//                `;

//     });
//   })
//   .catch(error => {
//     console.error("Error fetching data:", error);

//   });

const table = document.getElementById('userTableBody');

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  return "⭐".repeat(fullStars);
}

fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    const products = data.products;

    products.forEach(product => {
      const shortDescription = product.description.length > 50
        ? product.description.slice(0, 50) + "..." : product.description;

      const finalPrice = (product.price - (product.price * product.discountPercentage / 100)).toFixed(2);

      table.innerHTML += `
        <tr>
          <td>${product.id}</td>
          <td>${product.title}</td>
          <td>$${product.price}</td>
          <td>${product.discountPercentage}%</td>
          <td>$${finalPrice}</td>
          <td>${generateStars(product.rating)}</td>
          <td>${product.brand}</td>
          <td><img src="${product.thumbnail}" width="60" height="60"></td>
          <td>${shortDescription}</td>
        </tr>`;
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

