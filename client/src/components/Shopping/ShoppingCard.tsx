import { Box, Button, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { CartI, deleteFromLS, updateLocalCart, UserSizeI } from "../../features/cart/CartSlice"
import { RootState } from "../../store"
import Swal from 'sweetalert2'
import { useAuth } from "../../hooks/useAuth"
import { deleteApiUserCart, updateApiUserCart } from "@/features/cart/cartApiSlice"
import { Update } from "@mui/icons-material"
import { PublicRoutes } from "@/routes/routes"
import { Link } from "react-router-dom"


export default function CardShop (product: Partial<CartI>) {
    const auth = useAuth()
    const dispatch = useDispatch()
    const {products, complete} = useSelector((state:RootState) => auth.user ? state.apiCart : state.cart)
    const [renderCount, setRenderCount] = useState(0)
    const [apiQuantity, setApiQuantity] = useState(product.quantity)
    const [sizeChanged, setSizeChanged] = useState('')
    const currentProduct = products?.find(el => el.idProduct === product.idProduct)

    useEffect(() => {
        setRenderCount(renderCount + 1)
        if(auth.user) {
           verifyStock()
        }else {
            const selectorLocalAmount = (document.getElementById(`localAmount${product.idProduct}`) as HTMLInputElement)
            if(currentProduct?.sizeCart?.stock && parseInt(selectorLocalAmount.value) > currentProduct.sizeCart.stock) {
                Swal.fire({
                    text: "We will update your amount cause you have more than stock available",
                    icon: 'warning'
                })
                product.idProduct && dispatch(updateLocalCart({method: 'modify', id: product.idProduct, sizes:{stock: currentProduct.sizeCart.stock}}))
            }
        }
    }, [complete])

    const updateAmount = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        product.idProduct && dispatch(updateLocalCart({method: e.currentTarget.name, id: product.idProduct, sizes:{}}))
    }
    
    const updateApiAmount = async (e: React.MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        if(product.quantity !== apiQuantity) {
            if(product?.sizeCart?.stock && apiQuantity && product.sizeCart.stock >= apiQuantity) {
                await dispatch(updateApiUserCart({idUser: auth.id, idProduct: product.idProduct, quantity: apiQuantity}))
                Swal.fire({
                    text: "Amount updated succesfully",
                    icon: 'success',
                    timer: 1500
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: "can't exceed stock amount",
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                })
            }
        } else {
            Swal.fire({
                text: "You already have that quantity",
                icon: 'warning',
                confirmButtonText: 'Ok!'
            })
        }
    }
    
    const updateSize = (e: React.ChangeEvent<HTMLSelectElement> ) => {
        if(auth.user) setSizeChanged(e.target.value)
        else {
            const findedSize = product?.size?.find(el => el.size === e.target.value)
            product.idProduct && findedSize && dispatch(updateLocalCart({method: e.currentTarget.name, id: product.idProduct, sizes: findedSize}))
        }
    }

    const updateApiSize = async (e: React.MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        const findedApiSize = product?.size?.find(el => el.size === sizeChanged)
        await dispatch(updateApiUserCart({idUser: auth.id, idProduct: product.idProduct, id_size: findedApiSize?.id}))
        Swal.fire({
            text: "Size updated succesfully",
            icon: 'success',
            timer: 500
        })
        const selector = (document.getElementById('selectSize') as HTMLSelectElement)
        selector.value = 'currentSize' 
    }

    const verifyStock = async () => {
        const selectorAmount = (document.getElementById(`apiAmount${product.idProduct}`) as HTMLInputElement)
        if(currentProduct?.sizeCart?.stock && parseInt(selectorAmount.value) > currentProduct.sizeCart.stock) {
            await dispatch(updateApiUserCart({idUser: auth.id, idProduct: product.idProduct, quantity: currentProduct.sizeCart.stock}))
            Swal.fire({
                text: "We will update your amount cause you have more than stock available",
                icon: 'warning'
            })
        }
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
                    await dispatch(deleteApiUserCart({idUser: auth.id, idProduct}))
                    complete && Swal.fire(
                        'Deleted!',
                        'Your product has been deleted.',
                        'success'
                        )
                }
            }
          })
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
                        <Grid item xs={4} sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
                            <Link style={{fontSize: 'smaller'}} to={`${PublicRoutes.products}/${product.idProduct}`}>{product.name}</Link>
                        </Grid>
                        <Grid item xs={1}>
                            <p>$ {product.price}</p>
                        </Grid>
                        <Grid item xs={1}>
                                <span style={{marginTop: 5}}>Current: {currentProduct?.sizeCart?.size}</span>
                                <Box display={auth.user ? 'flex' : 'inherit'} gap={1}>
                                    <select name='changeSize' style={{width:'min-content'}} id='selectSize' defaultValue='currentSize' onChange={updateSize}>
                                        <option id="currentSize" value='currentSize' disabled>sizes</option>
                                        {product?.size?.map(s =><option key={s.size}>{s.size}</option>)}
                                    </select>
                                    {auth.user && <Button variant='contained' title='Update!' sx={{minWidth: 'max-content', padding: 0}} name='apiUpdate' onClick={updateApiSize}><Update sx={{width: 'fit-content'}}/></Button>}
                                </Box>
                        </Grid>
                        <Grid item xs={1}>
                            <p>{product?.sizeCart?.stock}</p>
                        </Grid>
                        { !auth.user &&
                        <Grid item xs={2} display={'flex'} alignItems='center' justifyContent='center'>
                                <button name='decrease' disabled={product.quantity ? product.quantity === 1 : false} style={{width:'25px'}} onClick={updateAmount}>-</button>
                                <input id={`localAmount${product.idProduct}`} disabled defaultValue={product.quantity} style={{width:'20px', textAlign:'center'}} />
                                <button name='increase' disabled={product.quantity && product.sizeCart?.stock ? (product.quantity >= product.sizeCart.stock) : false} style={{width:'25px'}} onClick={updateAmount}>+</button>
                        </Grid>}
                        {auth.user &&
                        <Grid item xs={2} display='flex' gap={1} alignItems='center' justifyContent='center'>
                                <input id={`apiAmount${product.idProduct}`} type='number' title="can't exceed stock" value={apiQuantity} style={{width:'20px', textAlign:'center'}} onChange={(e) => setApiQuantity(Number(e.target.value))}/>
                                <Button variant='contained' title='Update!' sx={{minWidth: 'max-content', padding: 0}} name='apiUpdate' onClick={updateApiAmount}><Update sx={{width: 'fit-content'}}/></Button>
                        </Grid>}
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