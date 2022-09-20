import { Box, Grid } from "@mui/material"
import  { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
// import { RootState } from "../../store"
// import { useAuth } from "../../hooks/useAuth"
import { useGetProductsDashboardQuery } from '@/features';
import { ProductsAdmin } from "@/sehostypes/Product";




export default function GraphicsCard (product: ProductsAdmin, time: string, category: string) {
    const {isSuccess: complete} = useGetProductsDashboardQuery({time, category})
    const [renderCount, setRenderCount] = useState(1)

    useEffect(() => {
        setRenderCount(renderCount + 1)
    }, [complete])

    

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
                        <Grid item xs={2}>
                            <label>Price</label>
                        </Grid>
                        <Grid item xs={2}>
                            <label>Size</label>
                        </Grid>
                        <Grid item xs={2}>
                            <label>Stock</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Amount</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Total</label>
                        </Grid>
                        <Grid item xs={4}>
                            <h5>{product.name}</h5>
                        </Grid>
                        <Grid item xs={2}>
                            <p>$ {product.sell_price}</p>
                        </Grid>
                        <Grid item xs={2}>
                                <select style={{marginTop: 15}} onChange={changeSize}>
                                    { product?.Orders_details?.size && product.Orders_details.map(s =><option key={s.size}>{s.size}</option>)}
                                </select>
                        </Grid>
                        <Grid item xs={2}>
                            <p>{size && size.stock}</p>
                        </Grid>
                        <Grid item xs={1}>
                            <p>$ {product.price && product.quantity ? product.quantity * product.price : 0}</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box> 
    )
}