const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Index Route 
app.get("/", async (req, res) => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      const products = data.products.slice(0, 10).map(product => ({
        id: product.id,
        title: product.title,
        description:product.description,
        price:product.price,
        rating:product.rating,
        thumbnail:product.thumbnail
      }));
      
      res.render("index", { products });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

//   Contact Route 
  app.get("/contact",(req,res)=>{
    res.render("contact");
  })

// Product page route 
app.get("/product/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();
        res.render("product", { product });
    } catch (err) {
        res.send('Error fetching product data',err);
    }
});

app.listen(port,()=>{
    console.log(`The Server is listening on port ${port}`);
});