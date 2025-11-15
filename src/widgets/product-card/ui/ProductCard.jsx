import { Card, CardActions, CardContent, CardMedia, Stack, Typography, Rating, Grid, Box, Chip } from '@mui/material'

import { AddFavorite, DeleteFavorite } from 'features/product-favorites/ui/ProductFavorites'
import { AddCart, AddCartFull, DeleteCart, DeleteCartFull } from 'features/product-cart/ui/ProductCart'

import { PAGE_CONFIG } from 'shared/configs/page.config'
import { Link } from 'shared/ui/Link'

import { useFavoriteStore, useCartStore } from 'app/providers/store-provider/StoreProvider'
import { CATEGORIES_FULL } from 'shared/configs/categories'
import { useParams } from 'react-router'
import { calculateDiscount } from 'shared/libs/calculateDiscount'

export function ProductCard({ data }) {
	const favorite = useFavoriteStore(state => state.favorite)
	const cart = useCartStore(state => state.cart)

	// Считает скидку
	data.discountValue = calculateDiscount(data.price, data.discount)

	return (
		<Card sx={{ height: '100%' }}>
			<CardMedia
				component='img'
				sx={{ height: 250, objectFit: 'contain', py: 1, background: '#fff' }}
				image={data.image}
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
									color='secondary'
									sx={{ fontWeight: 'bold' }}
								>
									{data.discountValue} ₽
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

	// Считает скидку
	data.discountValue = Math.round((data.price / 100) * (100 - data.discount))

	let { category } = useParams()

	return (
		<Card sx={{ display: 'flex' }}>
			<Box position='relative'>
				<CardMedia
					component='img'
					sx={{ height: 200, width: 200, objectFit: 'contain', p: 2, background: '#fff' }}
					image={data.image}
					title={data.name}
				/>
				<Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
					<Stack
						direction='row'
						gap={1}
					>
						{data.discount != 0 && (
							<Chip
								label={`-${data.discount}%`}
								color='error'
							/>
						)}
						{data.isNew && (
							<Chip
								label='Новое'
								color='warning'
							/>
						)}
					</Stack>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
				<CardContent
					sx={{ flex: '1 0 auto' }}
					pb={2}
				>
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
								<Link to={`${PAGE_CONFIG.product}/${data.id}`}>
									{data.features.type} {CATEGORIES_FULL[category].ru[0]} {data.name}
								</Link>
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
							<Stack
								direction='row'
								alignItems='center'
								gap={1}
							>
								<Typography
									variant='body1'
									sx={{ mt: '2px' }}
								>
									{data.inStock ? 'В наличии' : 'Нет в наличии'}
								</Typography>
							</Stack>
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
							color='secondary'
							sx={{ fontWeight: 'bold', mt: '-8px' }}
						>
							{data.discountValue} ₽
						</Typography>
					</Stack>
				)}
				<Grid size='auto'>
					<Stack
						direction='row'
						spacing={1}
					>
						{favorite.indexOf(data.id) == -1 ? <AddFavorite id={data.id} /> : <DeleteFavorite id={data.id} />}
						{cart.indexOf(data.id) == -1 ? <AddCartFull id={data.id} /> : <DeleteCartFull id={data.id} />}
					</Stack>
				</Grid>
			</Box>
		</Card>
	)
}
