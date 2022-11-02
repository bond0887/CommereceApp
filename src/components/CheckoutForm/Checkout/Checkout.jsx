import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, styled, CssBaseline } from '@mui/material';
import { commerce } from '../../../lib/commerce';

import { Link, useNavigate } from 'react-router-dom';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';


const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, order, onCaptureCheckout, error, refreshCart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const generateToken =  async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(token)
                setCheckoutToken(token);
            } catch (error) {
                navigate('/');
            }
        }

        generateToken();
    },[cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const timeout = () =>{
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    }

    const StyledMain = styled('main')(({theme}) => ({
        marginTop: '5%',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }));

    const StyledPaper = styled(Paper)(({theme}) => ({
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
          width: '100%',
          marginTop: 60,
        },
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
    }));

    const StyledStepper = styled(Stepper)(({theme}) => ({
        padding: theme.spacing(3, 0, 5),
    }));

    const StyledButton = styled(Button)(({theme}) => ({
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }));

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider style={{margin: '20px 0'}}/>
                <Typography variant="subtitle2">Order ref: {order.customer_reference} </Typography>
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase</Typography>
                <Divider style={{margin: '20px 0'}}/>
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button' onClick={() => refreshCart()}>Back to Home</Button>
        </>
    ) : (
        <div>
            <CircularProgress style={{ display:'flex', justifyContent:'center', alignItems:'center' }}/>
        </div>
    );

    if(error){
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    }

    const Form = () => activeStep===0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />


    return (
    <>
        <CssBaseline />
        <div />
        <StyledMain>
            <StyledPaper>
                <Typography variant="h4" align="center">Checkout</Typography>
                <StyledStepper activeStep={activeStep}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </StyledStepper>
                {activeStep===steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </StyledPaper>
        </StyledMain>
    </>
  );
}

export default Checkout;