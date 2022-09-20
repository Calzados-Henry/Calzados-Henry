import React from 'react'
import { Box, Grid } from "@mui/material"
import { Doughnut } from 'react-chartjs-2'



export const Graphycs = () => {
    const [time, setTime] = useState('Desde el principio')
const [category, setCategory] = useState('')
const {data} = useGetProductsDashboardQuery({time, category})
  return (
    <div>
        <Box>
            <Grid spacing={2} >
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >

                </Grid>
            </Grid>
        </Box>
        
    </div>
  )
}
