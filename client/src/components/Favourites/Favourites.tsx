import React from 'react'
import {Card, CardHeader, CardContent, Typography, Box, Tooltip, Zoom, Backdrop, CircularProgress, IconButton} from '@mui/material'
import { useDeleteFavouritesMutation, useGetFavouritesQuery } from '@/features/favourites/favouritesApiSlice';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '@/routes/routes';
import s from '../Card/Card.module.css';
import { Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';



export const FavouritesCards = () => { 
    const navigate = useNavigate()
    const auth = useAuth()
    const { data: favs, isLoading} = useGetFavouritesQuery(auth.id);
    const [deleteFavourites, {isLoading: deleteLoading}] = useDeleteFavouritesMutation()

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>, idProduct:number) => {
        e.preventDefault();
        await deleteFavourites({id_user: auth.id, id_product_details: idProduct})
        Swal.fire({
            title: 'Deleted',
            icon: 'info'
        })
    }

    return (
        <Box display='flex' width='100%' flexWrap='wrap'>
        {isLoading || deleteLoading && 
                <Backdrop
                  sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={true}
                ><CircularProgress color="inherit" size={200}/></Backdrop>}
        {favs?.map(fav =>  
            (<>
                <Card
                sx={{ maxWidth: '40%' }}
                style={{
                    height: '30vh',
                    width: '30vw',
                    display: 'flex',
                    flexDirection: 'column',
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    marginLeft: '20px',
                    marginTop: '20px',
                }}>
                <Tooltip
                title={fav.name}
                TransitionComponent={Zoom}
                sx={{ x: 1 }}
                arrow>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <CardHeader
                    color='inherit'
                    titleTypographyProps={{ fontSize: 18 }}
                    title={`${fav.name.slice(0,10)}...`}
                    onClick={() => navigate(`${PublicRoutes.products}/${fav.id_details}`)}
                    sx={{ cursor: 'pointer' }}
                    />
                    <IconButton
                    disabled={deleteLoading} 
                    onClick={(e) => handleClick(e, fav.id_details)}
                    >
                        <Delete/>
                    </IconButton>
                </Box>
                </Tooltip>
                <img src={fav.image} className={s.image}/>
                <CardContent color='inherit'>
                    <Typography variant='body2' color='text.secondary'>
                    Color: {fav.color}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                    Price: ${fav.price}
                    </Typography>
                </CardContent>
                </Card>
            </>)
        )}
        </Box>
    )
}