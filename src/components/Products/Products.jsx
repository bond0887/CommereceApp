import React from 'react';
import { Grid, styled} from '@mui/material';

import Slider from '../Slider/Slider';
import Product from './Product/Product';

// const products = [
//     { id: 1, name: 'Shoes', description: 'Running Shoes.', price: '$5', image: 'https://thumbs.dreamstime.com/b/blue-shoes-29507491.jpg' },
//     { id: 2, name: 'Macbook', description: 'Apple macbook.', price: '$10', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHw%3D&w=1000&q=80' },
// ];


const StyledMain = styled('main')(({theme}) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
}));

const StyledDivtool = styled('div')(({theme}) => ({
    height: '50px',
}));


const Products = ({ products, onAddToCart, seeDetails }) => {
    return (
        <StyledMain >
            <StyledDivtool />
            <Slider products={products} seeDetails={seeDetails} />
            <StyledDivtool />
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} seeDetails={seeDetails}/>
                    </Grid>
                ))}
            </Grid>
        </StyledMain>
    ); 
}

export default Products;