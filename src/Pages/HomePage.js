import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "../Components/Header";
import { Container, Grid, Pagination, Stack } from "@mui/material";
import axios from "axios";
import { setCart } from "../redux/actions/userAction";
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
export default function HomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
        setLoading(true);
        axios
            .get("https://fakse-store-api.herokuapp.com/api/v1/products?limit=10&offset=1")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            }
            )
            .catch((err) => {
                setError(true);
                setLoading(false);
            }
            );
    }, []);

    const handleCart = (data) => {
        const cartUser = JSON.parse(localStorage.getItem("cart"));
        const checkfilter = cartUser.filter(item => item.id === data.id)
        if(checkfilter.length !== 0){

        const newMap = cartUser.map(item => {
            if(item.id === data.id){
                item.qty = item.qty + 1
                console.log("item", item.qty)
            }else {
                return item
            }
            return item
        })
         localStorage.setItem("cart", JSON.stringify(newMap));
         const updatedCart = JSON.parse(localStorage.getItem("cart"));
        dispatch(setCart(updatedCart));

    }else{
        localStorage.setItem("cart", JSON.stringify([...cartUser, {id:data.id, qty:1}]));
        const updatedCarts = JSON.parse(localStorage.getItem("cart"));
        dispatch(setCart(updatedCarts));
    }
}
  return (
    <>
    {!isLoggedIn ? navigate("/login") : 

    <>
      <Header />
      <Container>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{ marginTop: "2rem" }}
      >
        {products.map((data, index) => (
            <Grid xs={2} sm={4} md={4} key={index} onClick={() => navigate(`/product-details/${"2"}`,{state:data})}>
            <Card sx={{ maxWidth: 345,maxHeight:600 }} style={{marginBottom:20}}>
              <CardMedia
                component="img"
                height="200"
                image={data.category.image}
                alt="green iguana"
                />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleCart(data)} size="small" variant="outlined">Add to Cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        style={{ display: "flex", justifyContent: "center" }}
      >

      <Stack spacing={2}>

      <Pagination count={10} onClick={(e)=> console.log(e.target.textContent)} color="primary" />
      </Stack>
      </Grid>

        </Container>
  </>
  }
    </>
  );
}
