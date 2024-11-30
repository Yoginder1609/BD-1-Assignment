const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;



// Server-side values
let taxrate = 5 // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

app.use(express.static('static'));
//1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

//2
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let discountedPrice = cartTotal - (cartTotal * 10/100);

  if (isMember) {
   res.send(discountedPrice.toString());
  } else {
    res.send(cartTotal.toString());
  }  
});

//3
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let calculatedTax = (cartTotal * 5/100);
  res.send(calculatedTax.toString());  
});

//4
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
 
  if (shippingMethod.toLowerCase() === 'standard') {
    res.send((distance / 50).toString());
  } else if(shippingMethod.toLowerCase() === 'express') {
    res.send((distance / 100).toString());
  } else {
    res.send('none');
  }
});

//5
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  
  if (weight = 2) {
    res.send((weight * distance * 0.1).toString());
  } else {
    res.send((weight * distance).toString());
  }
});


//6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = (purchaseAmount * 2);
  res.send(loyaltyPoints.toString());  
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
