import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { PAGE_CONFIG } from 'shared/configs/page.config'
import { Button } from 'shared/ui/Button'
import { Link } from 'shared/ui/Link'

export function ProductCard({ data }) {
	return (
		<Card sx={{ height: '100%' }}>
			<CardMedia
				sx={{ height: 250, backgroundColor: 'lightgrey' }}
				image='/static/images/cards/contemplative-reptile.jpg'
				title={data.name}
			/>
			<CardContent>
				<Typography
					gutterBottom
					variant='h6'
					component='div'
				>
					<Link to={`${PAGE_CONFIG.products}/${data.id}`}>{data.name}</Link>
				</Typography>
				<Typography
					variant='body1'
					sx={{ color: 'text.secondary' }}
				>
					{data.price} рублей
				</Typography>
			</CardContent>
			<CardActions>
				<Button>Купить</Button>
			</CardActions>
		</Card>
	)
}
