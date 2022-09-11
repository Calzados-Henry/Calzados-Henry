import { Box, Button, Paper, Stack, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { CartI, deleteAllfromLS } from "../../features/cart/CartSlice"
import { RootState } from "../../store"
import PromotionalList from "../PromotionalProducts/PromotionalList"
import CardShop from "./ShoppingCard"
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router-dom"
import { PublicRoutes } from "../../routes/routes"


export default function Shopping() {
    const products = useSelector((state:RootState) => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let parcial = 0
        products.forEach((p: { price: number; quantity: number }) => {
            parcial += p.price * p.quantity
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
            cancelButtonText: 'More Products'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Success!',
                'Redirecting!',
                'success'
              )
              setTimeout(() => {
                navigate(PublicRoutes.cart)
              }, 1000)
            } else {
                navigate(PublicRoutes.products)
            }
          })
    }

    return (
            <Box height='80%'>
                <h3>Your current Shopping Cart</h3>
                <Stack spacing={2} alignItems={'center'}>
                    {products.length ? products?.map((p: CartI) => {
                        return(<Item key = {p.idProduct}><CardShop
                            name = {p.name}
                            details = {p.details}
                            price = {p.price}
                            idProduct={p.idProduct}
                            quantity={p.quantity}
                        />
                        </Item>
                        )
                    }) :
                    <Item>There are any products in the cart, try go to our <Link to={PublicRoutes.products}>Products List</Link> and get someones</Item>
                    }
                </Stack>
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
                    {/* <PromotionalList></PromotionalList> */}
            </Box>
    )
}