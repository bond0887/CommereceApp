import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

import { styled } from '@mui/material';

import logo from '../../assets/commerce.png';

const drawerWidth=0;

const StyledAppbar = styled(AppBar)(({theme}) => ({
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
}));

// const StyledDivbutton = styled(Div)(({theme}) => ({
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
// }));

// const sxStyledDiv = ({theme}) => ({
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//         display: 'none',
//       },
// });
    



const sxStyletitle = {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
    marginLeft: '8px'
};

const sxStyleImage = {
    marginRight: '10px',
    paddingRight: '10px', 
};

// const sxStyleGrow = {
//     flexGrow: 1,
// };


const Navbar = ({ totalItems }) => {
    const location = useLocation();
  return (
    <>
        <StyledAppbar position="fixed" color="inherit">
            <Toolbar>
                <img src={logo} alt="Commerce.js" height="25px" sx={sxStyleImage} />
                <Typography component={Link} to="/" variant="h6" color="inherit" sx={sxStyletitle}>
                    Suraj Jindal | E-commerce
                </Typography>
                <div />
                {(location.pathname === '/' || location.pathname === '/productdetails') && (
                <div>
                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div> )}
            </Toolbar>
        </StyledAppbar>
    </>
  );
}

export default Navbar;