import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';



export default function Zapato() {
  return (
    <>
    <Card sx={{  maxWidth: 345 }} style={{backgroundColor: '#ceb5a7', borderStyle: 'solid', borderColor: 'white'}} >
      <CardHeader color='inherit'
        title="Zapato copado"
        subheader="Que Copado es este producto!"
      />
      <CardMedia color='inherit'
        component="img"
        height="180"
        image="https://d1fufvy4xao6k9.cloudfront.net/images/landings/338/derby-shoes-men-2.png"
        width='120'
        alt="Que zapato!"
      />
      <CardContent color='inherit'>
        <Typography variant="body2" color="text.secondary">
          Este es un zapato copado.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton  color='inherit' aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton color='inherit' aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
    </>
  );
}