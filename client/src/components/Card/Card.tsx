import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';



export default function Zapato (props: object) {
  return (
    <>
    <Card sx={{  maxWidth: 345 }} style={{backgroundColor: '#ceb5a7', borderStyle: 'solid', borderColor: 'white', marginLeft: '20px', marginTop: '20px'}} >
      <CardHeader color='inherit'
        title= {props.title}
        subheader="Que Copado es este producto!"
      />
      <CardMedia color='inherit'
        component="img"
        height="180"
        image= {props.image}

        alt="Que zapato!"
      />
      <CardContent color='inherit'>
        <Typography variant="body2" color="text.secondary">
          {`$ ${props.price}`}
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