import { Box, Button, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { CartI, deleteFromLS, updateQuantity } from "../../features/cart/CartSlice"
import { RootState } from "../../store"
import Swal from 'sweetalert2'
import { useAuth } from "../../hooks/useAuth"
import { deleteApiUserCart } from "@/features/cart/cartApiSlice"


export default function CardShop (product: Partial<CartI>) {
    const auth = useAuth()
    const userInfo = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo') as string) : null
    const dispatch = useDispatch()
    const {complete} = useSelector((state:RootState) => auth.user ? state.apiCart : state.cart)
    const [size, setSize] = useState(product.size && {size: product.size[0].size, stock: product.size[0].stock})
    const [renderCount, setRenderCount] = useState(1)


    useEffect(() => {
        setRenderCount(renderCount + 1)
    }, [complete])

    const updateAmount = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        product.idProduct &&
        dispatch(updateQuantity({method: e.currentTarget.name, id: product.idProduct}))
    }
    
    const deleteProduct = (e: React.MouseEvent<HTMLButtonElement>, idProduct: number) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You will delete that product from your cart!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
            if(!auth.user) {
                dispatch(deleteFromLS(idProduct))
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                    )
                } else {
                    await dispatch(deleteApiUserCart({idUser: userInfo.id, idProduct}))
                    complete && Swal.fire(
                        'Deleted!',
                        'Your product has been deleted.',
                        'success'
                        )
                }
            }
          })
    }

    const changeSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const finded = product.size?.findIndex(el => el.size === event.target.value)
        finded && setSize(product.size && {size: product.size[finded].size, stock: product.size[finded].stock})
    }

    return (
        <Box>
            <Grid container spacing={0} alignItems='center'>
                <Grid item xs={1}>
                    <img style={{width: '80%'}} src={product.image ? product.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg'} alt="No hay" />
                </Grid>
                <Grid item xs={11}>
                    <Grid container>
                        <Grid item xs={4}>
                            <label>Title</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Price</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Size</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Stock</label>
                        </Grid>
                        <Grid item xs={2}>
                            <label>Amount</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Total</label>
                        </Grid>
                        <Grid item xs={4}>
                            <h5>{product.name}</h5>
                        </Grid>
                        <Grid item xs={1}>
                            <p>$ {product.price}</p>
                        </Grid>
                        <Grid item xs={1}>
                                <select style={{marginTop: 15}} onChange={changeSize}>
                                    {product.size?.map(s =><option key={s.size}>{s.size}</option>)}
                                </select>
                        </Grid>
                        <Grid item xs={1}>
                            <p>{size && size.stock}</p>
                        </Grid>
                        <Grid item xs={2} display={'flex'} alignItems='center' justifyContent='center'>
                                <button name='decrease' disabled={product.quantity ? product.quantity === 1 : false} style={{width:'25px'}} onClick={updateAmount}>-</button>
                                <input id={'amount'} type={'number'} autoComplete={'off'} disabled defaultValue={product.quantity} style={{width:'20px', textAlign:'center'}} />
                                <button name='increase' disabled={product.quantity && size?.stock ? (product.quantity >= size?.stock) : false} style={{width:'25px'}} onClick={updateAmount}>+</button>
                        </Grid>
                        <Grid item xs={1}>
                            <p>$ {product.price && product.quantity ? product.quantity * product.price : 0}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant='contained' sx={{border:'1px solid primary.main'}} onClick={(e) => product.idProduct && deleteProduct(e, product.idProduct)}>Delete</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box> 
    )
}