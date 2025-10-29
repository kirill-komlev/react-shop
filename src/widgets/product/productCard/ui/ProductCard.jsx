import { Card, CardActions, CardContent, CardMedia, formLabelClasses, Grid, IconButton, Rating, Stack, Tooltip, Typography } from '@mui/material'
import { PAGE_CONFIG } from 'shared/configs/page.config'
import { Button } from 'shared/ui/Button'
import { Link } from 'shared/ui/Link'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useEffect, useState } from 'react'

export function ProductCard({ data }) {
	const [favorite, setFavorite] = useState(false)

	const addInFavorites = id => {
		let lSValue = []
		if (localStorage.getItem('favorite') === null) {
			localStorage.setItem('favorite', id)
		} else {
			let oldResult
			if (typeof localStorage.getItem('favorite') == 'string') {
				oldResult = localStorage.getItem('favorite').split(',')
			} else {
				oldResult = Array.from(String(parseInt(localStorage.getItem('favorite'))), Number)
			}
			let result = lSValue.concat(oldResult).concat(id)
			localStorage.setItem('favorite', result)
		}
		setFavorite(true)
	}

	const removeFromFavorites = id => {
		if (localStorage.getItem('favorite').split(',').length == 1) {
			localStorage.removeItem('favorite')
		} else {
			localStorage.setItem(
				'favorite',
				localStorage
					.getItem('favorite')
					.split(',')
					.filter(item => !(item == id))
			)
		}

		setFavorite(false)
	}

	useEffect(() => {
		console.log('useEffect')
		if (localStorage.getItem('favorite') == null) {
			return setFavorite(false)
		}
		let array = localStorage.getItem('favorite').split(',')
		if (array.indexOf(data.id.toString()) == -1) {
			setFavorite(false)
		} else {
			setFavorite(true)
		}
	})

	return (
		<Card sx={{ height: '100%' }}>
			<CardMedia
				sx={{ height: 250, backgroundColor: 'lightgrey' }}
				image='/static/images/cards/contemplative-reptile.jpg'
				title={data.name}
			/>
			<CardContent sx={{ pb: 0 }}>
				<Typography
					gutterBottom
					variant='h6'
					component='div'
				>
					<Link to={`${PAGE_CONFIG.products}/${data.id}`}>{data.name}</Link>
				</Typography>
				<Stack
					direction='row'
					alignItems='center'
					gap={1}
				>
					<Rating
						name='read-only'
						value={data.rating}
						precision={0.1}
						readOnly
					/>
					<Typography
						variant='body1'
						sx={{ mt: '2px' }}
					>
						{data.rating}
					</Typography>
				</Stack>
			</CardContent>
			<CardActions>
				<Grid
					container
					width='100%'
					alignItems='center'
					sx={{ mx: 1 }}
				>
					<Grid size='grow'>
						{data.discount == 0 ? (
							<Typography
								variant='h6'
								// sx={{ color: 'text.secondary' }}
								sx={{ fontWeight: 'bold' }}
							>
								{data.price} ₽
							</Typography>
						) : (
							<Stack
								direction='row'
								gap={1}
								alignItems='center'
							>
								<Typography
									variant='body1'
									sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
								>
									{data.price} ₽
								</Typography>
								<Typography
									variant='h6'
									// sx={{ color: 'text.secondary' }}
									sx={{ fontWeight: 'bold' }}
								>
									{(data.price / 100) * (100 - data.discount)} ₽
								</Typography>
							</Stack>
						)}
					</Grid>
					<Grid
						size='auto'
						gap={2}
					>
						{favorite ? (
							<Tooltip title='Убрать из избранного'>
								<IconButton onClick={() => removeFromFavorites(data.id)}>
									<FavoriteIcon color='error' />
								</IconButton>
							</Tooltip>
						) : (
							<Tooltip title='Добавить в избранное'>
								<IconButton onClick={() => addInFavorites(data.id)}>
									<FavoriteBorderIcon />
								</IconButton>
							</Tooltip>
						)}
						<Tooltip title='Добавить в корзину'>
							<IconButton>
								<ShoppingCartIcon />
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	)
}
