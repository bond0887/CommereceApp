import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';

const CartItem = ({ item, onRemoveFromCart, onUpdateCartQty }) => {
  return (
    <Card>
        <CardMedia style={{height: 260}} component="img" height="200" image={item.image.url} alt={item.name}/>
        <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'space-between'}}>
            <div style={{display:'flex', alignItems:'center'}}>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
            </div>
            <Button variant='contained' type='button' color='secondary' onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
        </CardActions>
    </Card>
  );
};

export default CartItem;