import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography,IconButton, Button } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// import useStyles from './styles';

const Product = ({ product, onAddToCart, seeDetails }) => {
    // const classes = useStyles();

    return (
      <Card style={{maxWidth: '100%'}}>
          <CardMedia component="img" height="200" image={product.image.url} alt={product.name} />
          <CardContent>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography variant="h5" gutterBottom>
                      {product.name}
                  </Typography>
                  <Typography variant="h5">
                      {product.price.formatted_with_symbol}
                  </Typography>
              </div>
              {/* <Typography variant="body2" color="textSecondary">{product.description.slice(3,-4)}</Typography> */}
          </CardContent>
          <CardActions disableSpacing style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='outlined' color='primary' onClick={() => seeDetails(product.id)} component={Link} to="/productdetails" >Details</Button>
                <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
          </CardActions>
      </Card>
  );
};

export default Product;