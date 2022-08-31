import {Card, CardActionArea, Typography, CardContent} from "@mui/material"

export default function About(){

    return  (
        <Card sx={{ maxWidth: '80%'}}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h2" component="div">
                Sehos Company
              </Typography>
              <Typography variant="body1" color="text.primary">
              We are a family company with more than 10 years of experience in the footwear market, venturing into internet sales to satisfy the needs of our customers to the fullest.
            We have a local with sale to the public, you can visit us from Monday to Friday from 8:00 a.m. to 7:00 p.m.
            
            We are a guarantee of trust when making your purchases, we have employees willing to answer all your questions, do not hesitate to contact our service center through social networks
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
}