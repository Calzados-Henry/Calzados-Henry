import { Backdrop, Box, Button, CircularProgress, Paper, Stack, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { CartI, deleteAllfromLS } from "../../features/cart/CartSlice"
import { RootState } from "../../store"
import PromotionalList from "../PromotionalProducts/PromotionalList"
import CardShop from "./ShoppingCard"
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router-dom"
import { PrivatesRoutes, PublicRoutes } from "../../routes/routes"
import { useAuth } from "../../hooks/useAuth"
import { getApiUserCart } from "../../features/cart/cartApiSlice"


export default function Shopping() {
    const auth = useAuth()
    const {loading, products, error, complete} = useSelector((state:RootState) => auth.user ? state.apiCart : state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)

    useEffect(() => {
      window.localStorage.getItem('userInfo') &&
      dispatch(getApiUserCart(JSON.parse(window.localStorage.getItem('userInfo') as string).id))
    }, [])

    useEffect(() => {
        let parcial = 0
        products.forEach( p => {
            p.price && (parcial = parcial + (p.price * p.quantity))
        })
        setTotal(parcial)
    }, [products])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        maxWidth: '100%',
        maxHeight: '10%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const deleteAll = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You will delete all products from your cart!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete them!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteAllfromLS())
              Swal.fire(
                'Deleted!',
                'Your products has been deleted.',
                'success'
              )
            }
          })
    }

    const confirmOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Swal.fire({
            title: 'Confirm purchase?',
            text: "You can add more products to your cart!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!',
          }).then((result) => {
            if (result.isConfirmed) {
              if(!auth.user) {
                Swal.fire({
                  title: 'Wait!',
                  icon: 'error',
                  text: 'First you need to Sign In! Redirecting!',
                  showConfirmButton: false,
                  timer: 1000,
                });
                setTimeout(() => {
                  navigate(PublicRoutes.login)
                }, 1000)
              } else {
                Swal.fire({
                  title: 'Redirecting!',
                  icon: 'info',
                  text: 'Please complete checkout form!',
                  showConfirmButton: false,
                  timer: 1000,
                });
                
                setTimeout(() => {
                  navigate(PrivatesRoutes.checkout)
                }, 1000)
              }
            }
          })
    }

    return (
            <Box height='80%'>
                <h3>Your current Shopping Cart</h3>
                {loading ? 
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={true}
                ><CircularProgress color="inherit" /></Backdrop> :
                <Stack spacing={2} alignItems={'center'}>
                    {products.length ? products?.map((p: CartI) => {
                        return(<Item key = {p.idProduct}><CardShop
                            idUser={auth.user ? p.idUser : null}
                            idProduct={p.idProduct}
                            image = {p.image}
                            name = {p.name}
                            color = {p.color}
                            size = {p.size}
                            price = {p.price}
                            quantity={p.quantity}
                        />
                        </Item>
                        )
                    }) :
                    <Item>There are any products in the cart, try go to our <Link to={PublicRoutes.products}>Products List</Link> and get someones</Item>
                    }
                </Stack>}
                {products.length <= 1 ? null : 
                <Box display={'flex'} justifyContent={'flex-end'} margin={2}>
                    <Button sx={{width:120}} variant="contained" onClick={deleteAll}>Delete All</Button>
                </Box>}
                {!products.length ? null : 
                <Box display={'flex'} justifyContent={'flex-end'} gap={5} margin={2}>
                    <Typography variant='body1' color='text.secondary' sx={{alignSelf: 'center'}}>Total: $ {total}</Typography>
                    <Button sx={{width:120}} variant="contained" onClick={confirmOrder}>Buy Now!</Button>
                </Box>}

                {!products.length ? null : 
                <Box sx={{height: '20%'}}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
                        <h3>Want to buy more? Go to our</h3>
                        <Button sx={{height:'min-content'}} variant="contained" onClick={() => navigate(PublicRoutes.products)}>Product List</Button>
                    </Box>
                </Box>}
                    <h2>Recommended</h2>
                    <PromotionalList></PromotionalList>
            </Box>
    )
}