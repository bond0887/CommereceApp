import React from 'react';
import { Typography, styled, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductDetails = ({ product, onAddToCart }) => {

    const StyledMain = styled('main')(({theme}) => ({
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    }));
    
    const StyledDivtool = styled('div')(({theme}) => ({
        height: '50px',
    }));

  return (
    <>
        <StyledMain>
            <StyledDivtool />
            <div  style={{display: 'flex', gap: '40px', margin: '20px', color: '#324d67'}}>
                <div>
                    <img style={{borderRadius: '15px', margin: '20px 15px', backgroundColor: '#ebebeb', cursor: 'pointer', transition: '.3s ease-in-out', height: '400px', width:'400px'  }} src={product.image.url} alt={product.name}  />
                </div>
                <div style={{paddingRight: '25px'}}>
                    <Typography style={{marginTop: '10px', fontWeight: '300'}} variant='h1'>{product.name}</Typography>
                    <Typography variant='h5' style={{marginTop: '10px'}} >Details:</Typography>
                    <Typography variant='body1' style={{marginTop: '10px', textAlign: 'justify'}}>{product.description.slice(3,-4)}</Typography>
                    <Typography variant='body1' style={{fontWeight: '700', fontSize:'26px', marginTop:'30px', color:'#f02d34'}} >{product.price.formatted_with_symbol}</Typography>
                    <div style={{marginTop: '20px'}}>
                        <Button style={{marginRight: '10px'}} component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
                        <Button style={{marginLeft: '10px'}} variant='contained' color='primary' onClick={() => onAddToCart(product.id, 1)}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </StyledMain>
    </>
  );
}

export default ProductDetails;