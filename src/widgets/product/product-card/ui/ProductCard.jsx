import { useState } from 'react'

import { Card, CardActions, CardContent, CardMedia, Stack, Typography, Rating, Grid } from '@mui/material'

import { AddCart } from 'features/product/add-cart/ui/AddCart'
import { DeleteCart } from 'features/product/delete-cart/ui/DeleteCart'

import { PAGE_CONFIG } from 'shared/configs/page.config'
import { Link } from 'shared/ui/Link'
import { AddFavorite } from 'features/product/add-favorite/ui/AddFavorite'
import { DeleteFavorite } from 'features/product/delete-favorite/ui/DeleteFavorite'

export function ProductCard({ data }) {
	const [cart, setCart] = useState(false)
	const [favorite, setFavorite] = useState(false)
	// const [cart, setCart] = useState([])

	// () => {
	// if (localStorage.getItem('cart') == null) {
	// 	return [0]
	// }
	// const localData = localStorage.getItem('cart').split(',')
	// return localData
	// }

	// useEffect(() => {
	// 	localStorage.setItem('cart', cart)
	// }, [cart])

	// console.log(typeof cart)

	// const [favorite, setFavorite] = useState(false)

	// const addInFavorites = id => {
	// 	let lSValue = []
	// 	if (localStorage.getItem('favorite') === null) {
	// 		localStorage.setItem('favorite', id)
	// 	} else {
	// 		let oldResult
	// 		if (typeof localStorage.getItem('favorite') == 'string') {
	// 			oldResult = localStorage.getItem('favorite').split(',')
	// 		} else {
	// 			oldResult = Array.from(String(parseInt(localStorage.getItem('favorite'))), Number)
	// 		}
	// 		let result = lSValue.concat(oldResult).concat(id)
	// 		localStorage.setItem('favorite', result)
	// 	}
	// 	setFavorite(true)
	// }

	// const removeFromFavorites = id => {
	// 	if (localStorage.getItem('favorite').split(',').length == 1) {
	// 		localStorage.removeItem('favorite')
	// 	} else {
	// 		localStorage.setItem(
	// 			'favorite',
	// 			localStorage
	// 				.getItem('favorite')
	// 				.split(',')
	// 				.filter(item => !(item == id))
	// 		)
	// 	}

	// 	setFavorite(false)
	// }

	// useEffect(() => {
	// 	if (localStorage.getItem('favorite') == null) {
	// 		return setFavorite(false)
	// 	}
	// 	let array = localStorage.getItem('favorite').split(',')
	// 	if (array.indexOf(data.id.toString()) == -1) {
	// 		setFavorite(false)
	// 	} else {
	// 		setFavorite(true)
	// 	}
	// })

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
						precision={0.5}
						readOnly
					/>
					<Typography
						variant='body1'
						sx={{ mt: '2px' }}
					>
						{/* {data.rating} */}
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
								gap={0.5}
							>
								<Typography
									variant='h6'
									// sx={{ color: 'text.secondary' }}
									sx={{ fontWeight: 'bold' }}
								>
									{(data.price / 100) * (100 - data.discount)} ₽
								</Typography>
								<Typography
									variant='caption'
									sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
								>
									{data.price} ₽
								</Typography>
							</Stack>
						)}
					</Grid>
					<Grid
						size='auto'
						gap={2}
					>
						{/* {favorite ? (
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
						)} */}
						{/* <Tooltip title='Добавить в корзину'>
							<IconButton>
								<ShoppingCartIcon />
							</IconButton>
						</Tooltip> */}
						{/* {cart.indexOf(data.id) == -1 ? <Button onClick={() => addInCart(data.id)}>Купить</Button> : <Button variant='outlined'>В корзине</Button>} */}
						{favorite ? <DeleteFavorite onClick={() => setFavorite(false)} /> : <AddFavorite onClick={() => setFavorite(true)} />}
						{cart ? <DeleteCart onClick={() => setCart(false)} /> : <AddCart onClick={() => setCart(true)} />}
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	)
}
