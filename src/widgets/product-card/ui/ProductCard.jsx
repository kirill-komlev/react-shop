import { Card, CardActions, CardContent, CardMedia, Stack, Typography, Rating, Grid, Box } from '@mui/material'

import { AddFavorite, DeleteFavorite } from 'features/product-favorites/ui/ProductFavorites'
import { AddCart, AddCartFull, DeleteCart, DeleteCartFull } from 'features/product-cart/ui/ProductCart'

import { PAGE_CONFIG } from 'shared/configs/page.config'
import { Link } from 'shared/ui/Link'

import { useFavoriteStore } from 'shared/libs/favorites-store'
import { useCartStore } from 'shared/libs/cart-store'

export function ProductCard({ data }) {
	const favorite = useFavoriteStore(state => state.favorite)
	const cart = useCartStore(state => state.cart)

	return (
		<Card sx={{ height: '100%' }}>
			<CardMedia
				component='img'
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
					{data.category == 'Мыши' ? (
						<Link to={`${PAGE_CONFIG.product}/${data.id}`}>
							{data.features.type} мышь {data.name}
						</Link>
					) : data.category == 'Клавиатуры' ? (
						<Link to={`${PAGE_CONFIG.product}/${data.id}`}>
							{data.features.type} клавиатура {data.name}
						</Link>
					) : (
						<Link to={`${PAGE_CONFIG.product}/${data.id}`}>
							{data.features.connection} наушники {data.name}
						</Link>
					)}
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
									color='primary'
									sx={{ fontWeight: 'bold' }}
								>
									{Math.round((data.price / 100) * (100 - data.discount))} ₽
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
						{favorite.indexOf(data.id) == -1 ? <AddFavorite id={data.id} /> : <DeleteFavorite id={data.id} />}
						{cart.indexOf(data.id) == -1 ? <AddCart id={data.id} /> : <DeleteCart id={data.id} />}
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	)
}

export function ProductCardHorizontal({ data }) {
	const favorite = useFavoriteStore(state => state.favorite)
	const cart = useCartStore(state => state.cart)

	return (
		<Card sx={{ display: 'flex' }}>
			<CardMedia
				sx={{ height: 200, width: 200, backgroundColor: 'lightgrey' }}
				image='/static/images/cards/contemplative-reptile.jpg'
				title={data.name}
			/>
			<Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Box
						display='flex'
						flexDirection='column'
						justifyContent='space-between'
						height='100%'
					>
						<Stack gap={1}>
							<Typography
								gutterBottom
								variant='h5'
								component='div'
							>
								{data.category == 'Мыши' ? (
									<Link to={`${PAGE_CONFIG.product}/${data.id}`}>
										{data.features.type} мышь {data.name}
									</Link>
								) : data.category == 'Клавиатуры' ? (
									<Link to={`${PAGE_CONFIG.product}/${data.id}`}>
										{data.features.type} клавиатура {data.name}
									</Link>
								) : (
									<Link to={`${PAGE_CONFIG.product}/${data.id}`}>
										{data.features.connection} наушники {data.name}
									</Link>
								)}
								{/* <Link to={`${PAGE_CONFIG.product}/${data.id}`}>{data.name}</Link> */}
							</Typography>
							<Typography
								variant='body1'
								color='textSecondary'
							>
								{data.category == 'Мыши' ? (
									<>
										{data.features.dpi} dpi, {data.features.connection}, {data.features.buttons} кнопок
									</>
								) : data.category == 'Клавиатуры' ? (
									<>
										{data.features.switch}, {data.features.connection}, {data.features.size}
									</>
								) : (
									<>
										{data.features.type}, {data.features.frequency}
									</>
								)}
							</Typography>
						</Stack>
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
								{data.rating}
							</Typography>
						</Stack>
					</Box>
				</CardContent>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 1, p: 2 }}>
				{data.discount == 0 ? (
					<Typography
						variant='h6'
						sx={{ fontWeight: 'bold' }}
					>
						{data.price} ₽
					</Typography>
				) : (
					<Stack
						direction='column'
						alignItems='end'
					>
						<Typography
							variant='caption'
							sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
						>
							{data.price} ₽
						</Typography>
						<Typography
							variant='h6'
							color='primary'
							sx={{ fontWeight: 'bold', mt: '-8px' }}
						>
							{Math.round((data.price / 100) * (100 - data.discount))} ₽
						</Typography>
					</Stack>
				)}
				<Grid
					size='auto'
					gap={2}
				>
					{favorite.indexOf(data.id) == -1 ? <AddFavorite id={data.id} /> : <DeleteFavorite id={data.id} />}
					{cart.indexOf(data.id) == -1 ? <AddCartFull id={data.id} /> : <DeleteCartFull id={data.id} />}
				</Grid>
			</Box>
		</Card>
	)
}
