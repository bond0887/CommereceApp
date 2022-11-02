 import React, { useState, useEffect } from 'react';
 import Products from './components/Products/Products';
 import ProductDetails from './components/Products/Product/ProductDetails';
 import Navbar from './components/Navbar/Navbar';
 import Cart from './components/Cart/Cart';
 import Checkout from './components/CheckoutForm/Checkout/Checkout';
 import { commerce } from './lib/commerce';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
 const App = () => {

   const [products, setProducts] = useState([]);
   const [product, setProduct] = useState({});
   const [ cart, setCart ] = useState({});
   const [order, setOrder] = useState({});
   const [errorMessage, setErrorMessage] = useState('');

   const fetchProduct = async () => {
      const { data } = await commerce.products.list();

      setProducts(data);
   }

   const fetchCart = async () => {
     setCart(await commerce.cart.retrieve());
   }

   const handleAddToCart = async (productId, quantity) => {
      setCart(await commerce.cart.add(productId, quantity));
   }

   const handleUpdateCartQty = async (productId, quantity) => {
      setCart(await commerce.cart.update(productId, { quantity }));
   }

   const handleRemoveFromCart = async (productId) => {
     setCart(await commerce.cart.remove(productId));
   }

   const handleEmptyCart = async () => {
     setCart(await commerce.cart.empty());
   }

   const refreshCart = async () => {
     const newCart = await commerce.cart.refresh();

     setCart(newCart);
   }

   const seeDetails = (productId) => {
     const productFound = products.find((prod) => prod.id===productId);
      setProduct(productFound); 
   }


   const handleCaptureCheckout = async (checkoutTokenId, newOrder ) => {
     try {
       const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
       setOrder(incomingOrder);
       refreshCart();
     } catch (error) {
       setErrorMessage(error.data.error.message);
     }
   }

   useEffect(() => {
        fetchProduct();
        fetchCart();
   }, []);

   return (
     <Router>
        <div>
          <Navbar totalItems={cart.total_items} />
          <Routes>
            <Route exact path="/" element={ <Products products={products} onAddToCart={handleAddToCart} seeDetails={seeDetails} /> } />
            <Route exact path="/cart" element={ <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} /> } />
            <Route exact path="/checkout" element={ <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} refreshCart={refreshCart} />} />
            <Route exact path="/productdetails" element={ <ProductDetails product={product} onAddToCart={handleAddToCart} />} />
          </Routes>
        </div>
     </Router>
   );
 }
 
 export default App;