import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Header from '../Components/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {

    const [filterProduct, setFilterProduct] = React.useState([]);
    const cart = useSelector(state => state.user.cart);

    const filterProducts = async() => {
        const response = await axios.get("https://fakse-store-api.herokuapp.com/api/v1/products?limit=200&offset=1")
        .then((res) => {
            const filtercart = res.data.filter(item => cart.some(cartitem => cartitem.id === item.id))
            setFilterProduct(filtercart);
        }
        ).catch((err) => {console.log(err);});

    }
    React.useEffect(() => {
        filterProducts();
    })
  return (
    <>
    <Header/>
    { filterProduct.map((product,index) => (
        
        <Paper
        key={index}
        sx={{
            p: 2,
            margin: 'auto',
          maxWidth: 500,
          marginTop: '50px',
          flexGrow: 1,
          backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
        >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={product.category.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                QUANTITY: { (cart.filter(cartitem => cartitem.id === product.id)[0].qty) }
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              ${product.price}.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
        ))}
    </>
  );
}
