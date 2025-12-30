import { Card, CardActions, CardContent, CardMedia, Stack, Typography, Grid, Box, Chip } from '@mui/material'

import { AddFavorite, DeleteFavorite } from 'features/product-favorites/ui/ProductFavorites'
import { AddCart, AddCartFull, DeleteCart, DeleteCartFull } from 'features/product-cart/ui/ProductCart'

import { PAGE_CONFIG } from 'shared/configs/page.config'
import { Link } from 'shared/ui/Link'

import { useFavoriteStore, useCartStore } from 'app/providers/store-provider/StoreProvider'
import { Rating } from 'shared/ui/Rating'

export function ProductCard({ data, type = 'vertical' }) {
	const favorite = useFavoriteStore(state => state.favorite)
	const cart = useCartStore(state => state.cart)

	const CardImage = () => (
		<Box position='relative'>
			<CardMedia
				component='img'
				sx={{ height: 250, minWidth: 250, objectFit: 'contain', p: 1, background: '#fff' }}
				image={data.image}
				title={data.name}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null // prevents looping
					if (data.category == 'Мыши') currentTarget.src = '/images/mouse-sample.jpg'
					else if (data.category == 'Клавиатуры') currentTarget.src = '/images/keyboard-sample.jpg'
					else currentTarget.src = '/images/headphones-sample.jpg'
				}}
			/>
			<Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
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
					{data.isBestseller && (
						<Chip
							label='Хит продаж'
							color='secondary'
						/>
					)}
				</Stack>
			</Box>
		</Box>
	)

	const CardName = () => (
		<Typography
			gutterBottom
			variant='h5'
			component='div'
		>
			{data.category == 'Мыши' ? (
				<Link to={`${PAGE_CONFIG.product}/${data.id}/${data.name.replace(/\s/g, '-').toLowerCase()}}`}>
					{data.features.type} мышь {data.name}
				</Link>
			) : data.category == 'Клавиатуры' ? (
				<Link to={`${PAGE_CONFIG.product}/${data.id}/${data.name.replace(/\s/g, '-').toLowerCase()}}`}>
					{data.features.type} клавиатура {data.name}
				</Link>
			) : (
				<Link to={`${PAGE_CONFIG.product}/${data.id}/${data.name.replace(/\s/g, '-').toLowerCase()}}`}>
					{data.features.connection} наушники {data.name}
				</Link>
			)}
		</Typography>
	)

	const CardPrice = () => {
		if (data.discount == 0) {
			return (
				<Typography
					variant='h6'
					sx={{ fontWeight: 'bold' }}
				>
					{data.price} ₽
				</Typography>
			)
		} else {
			return type == 'vertical' ? (
				<Stack
					direction='row'
					gap={0.5}
				>
					<Typography
						variant='h6'
						color='primary'
						sx={{ fontWeight: 'bold' }}
					>
						{Math.round(data.finalPrice)} ₽
					</Typography>
					<Typography
						variant='caption'
						sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
					>
						{data.price} ₽
					</Typography>
				</Stack>
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
						{Math.round(data.finalPrice)} ₽
					</Typography>
				</Stack>
			)
		}
	}

	const CardFavoriteButton = () => {
		if (favorite.indexOf(data.id) == -1) {
			return <AddFavorite id={data.id} />
		} else {
			return <DeleteFavorite id={data.id} />
		}
	}

	const CardCartButton = () => {
		if (cart.indexOf(data.id) == -1) {
			return type == 'vertical' ? <AddCart id={data.id} /> : <AddCartFull id={data.id} />
		} else {
			return type == 'vertical' ? <DeleteCart id={data.id} /> : <DeleteCartFull id={data.id} />
		}
	}

	const VerticalCard = () => (
		<Card sx={{ height: '100%' }}>
			<CardImage data={data} />
			<CardContent sx={{ pb: 0 }}>
				<CardName />
				<Rating rating={data.rating} />
			</CardContent>
			<CardActions>
				<Grid
					container
					width='100%'
					alignItems='center'
					sx={{ mx: 1 }}
				>
					<Grid size='grow'>
						<CardPrice />
					</Grid>
					<Grid
						size='auto'
						gap={2}
					>
						<CardFavoriteButton />
						<CardCartButton />
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	)

	const HorizontalCard = () => {
		return (
			<Card sx={{ display: 'flex' }}>
				<CardImage data={data} />
				<CardContent
					sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
					pb={2}
				>
					<Stack gap={1}>
						<CardName />
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
						<Rating rating={data.rating} />
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
				</CardContent>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 1, p: 2 }}>
					<CardPrice />
					<Grid size='auto'>
						<Stack
							direction='row'
							spacing={1}
						>
							<CardFavoriteButton />
							<CardCartButton />
						</Stack>
					</Grid>
				</Box>
			</Card>
		)
	}

	if (type === 'vertical') return <VerticalCard />
	else return <HorizontalCard />
}
