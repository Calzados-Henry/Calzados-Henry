import { Box, Button, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { CartI, deleteFromLS, updateQuantity } from "../../features/cart/CartSlice"
import { RootState } from "../../store"
import Swal from 'sweetalert2'


export default function CardShop (product: Partial<CartI>) {
    const dispatch = useDispatch()
    const cart = useSelector((state:RootState) => state.cart)
    const [renderCount, setRenderCount] = useState(1)

    useEffect(() => {
        setRenderCount(renderCount + 1)
    }, [cart])

    const updateAmount = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        product.idProduct &&
        dispatch(updateQuantity({method: e.currentTarget.name, id: product.idProduct}))
    }
    
    const deleteProduct = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You will delete that product from your cart!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteFromLS(id))
              Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
              )
            }
          })
    }

    return (
        <Box>
            <Grid container spacing={0} alignItems='center'>
                <Grid item xs={2}>
                    <img style={{width: '30%'}} src={product.details?.images ? product.details.images[0].image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg'} alt="No hay" />
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={5}>
                            <label>Title</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>price</label>
                        </Grid>
                        <Grid item xs={3}>
                            <label>Amount</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Total</label>
                        </Grid>
                        <Grid item xs={5}>
                            <h5>{product.name}</h5>
                        </Grid>
                        <Grid item xs={1}>
                            <p>$ {product.price}</p>
                        </Grid>
                        <Grid item xs={3} display={'flex'} alignItems='center' justifyContent='center'>
                                <button name='decrease' style={{width:'25px'}} onClick={updateAmount}>-</button>
                                <input id={'amount'} type={'number'} autoComplete={'off'} disabled defaultValue={product.quantity} style={{width:'20px', textAlign:'center'}} />
                                <button name='increase' style={{width:'25px'}} onClick={updateAmount}>+</button>
                        </Grid>
                        <Grid item xs={1}>
                            <p>$ {product.price && product.quantity ? product.quantity * product.price : 0}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant='contained' sx={{border:'1px solid primary.main'}} onClick={(e) => product.idProduct ? deleteProduct(e, product.idProduct) : e.preventDefault()}>Delete</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box> 
    )
}