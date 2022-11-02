import React from 'react';
import { Container, Typography, Button, Grid, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import CartItem from './Cart/CartItem/CartItem';


const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    const StyledButton = styled(Button)(({theme}) => ({
        minWidth: '150px',
        [theme.breakpoints.down('xs')]: {
        marginBottom: '5px',
        },
        [theme.breakpoints.up('xs')]: {
        marginRight: '20px',
        },
    }));

    const sxButton = {
        minWidth: '150px',
    };

    const StyledDiv = styled('div')(({theme}) => ({
        display: 'flex',
        marginTop: '10%',
        width: '100%',
        justifyContent: 'space-between',
    }));

    const StyledDivtool = styled('div')(({theme}) => ({
        height: '50px',
    }));


    if (!cart) return 'Loading...';

    const EmptyCart = () => (
        <Typography variant='subtitle1'>You have no item in your cart,
            <Link to="/" style={{textDecoration: 'none'}}>start adding some</Link>!
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onRemoveFromCart={handleRemoveFromCart} onUpdateCartQty={handleUpdateCartQty} />
                    </Grid>
                ))}
            </Grid>
            <StyledDiv>
                <Typography variant='h4'>SubTotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <StyledButton size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>Empty Cart</StyledButton>
                    <Button component={Link} to="/checkout" sx={sxButton} size='large' type='button' variant='contained' color='primary'>CheckOut</Button>
                </div>
            </StyledDiv>
        </>
    );


  return (
    <Container>
        <StyledDivtool />
        <Typography style={{marginTop: '5%'}} variant="h3" gutterBottom>Your Shopping Cart</Typography>
        { !cart.line_items.length ? EmptyCart() : FilledCart() }
    </Container>
  );
};

export default Cart;