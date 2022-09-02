import { Box, Button, Grid } from "@mui/material"
import { useState } from "react"
import { ProductI } from "../../features/product/product.model"
import { removeOneFromLS } from "../../utils/utils"

export default function CardShop (product: ProductI) {
    const [amount, setAmount] = useState(1)

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAmount(Number(e.target.value))
    }

    return (
        <Box>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={2}>
                    <img style={{width: '30%'}} src={product.image} alt="No hay" />
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={7}>
                            <label>Title</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>price</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Amount</label>
                        </Grid>
                        <Grid item xs={1}>
                            <label>Total</label>
                        </Grid>
                        <Grid item xs={7}>
                            <h5>{product.title}</h5>
                        </Grid>
                        <Grid item xs={1}>
                            <p>$ {product.price}</p>
                        </Grid>
                        <Grid item xs={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <input id={'amount'} type={'number'} defaultValue={1} style={{width: '50%'}} min={1} onChange={handleAmountChange}/>
                        </Grid>
                        <Grid item xs={1}>
                            <p>$ {amount * product.price}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant='text' sx={{border:'1px solid primary.main'}} onClick={() => removeOneFromLS(product.id)}>Delete</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box> 
    )
}