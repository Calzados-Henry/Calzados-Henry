import { Box, Paper, Stack, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { ProductI } from "../../features/product/product.model"
import { getLocalStorage} from '../../utils/utils'
import CardShop from "./ShoppingCard"


export default function Shopping() {
    const [products, setProducts] = useState<ProductI[]>([])
    const [error, setError] = useState<string>("")

    useEffect(() => {
        try {
            const local = getLocalStorage()
            setProducts(local)
            console.log(localStorage.product)
        } catch (error: any) {
            setError(error.message)
        }
    }, [])

    useEffect(() => {
        console.log('cambio')
        console.log(localStorage.product)
    }, [localStorage.product?.length])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        maxWidth: '100%',
        maxHeight: '10%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
            <Box height='80%'>
                <h3>Your current Shopping Cart</h3>
                <Stack spacing={2} alignItems={'center'}>
                    {error && <Item>{error}</Item>}
                    {products?.map(product => {
                        return(<Item key = {product.id}><CardShop
                            title = {product.title}
                            image = {product.image}
                            price = {product.price}
                            id={product.id} 
                            description={product.description} 
                            category={product.category} 
                            rating={product.rating}
                        />
                        </Item>
                        )
                    })}
                </Stack>
            </Box>
    )
}