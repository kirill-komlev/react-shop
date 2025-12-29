import { Box, Breadcrumbs, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { useCartStore, useFavoriteStore } from 'app/providers/store-provider/StoreProvider'
import { AddCartFull, DeleteCartFull } from 'features/product-cart/ui/ProductCart'
import { AddFavorite, DeleteFavorite } from 'features/product-favorites/ui/ProductFavorites'
import { useParams } from 'react-router'
import { CATEGORIES_FULL } from 'shared/configs/categories'
import { PAGE_CONFIG } from 'shared/configs/page.config'
import { useDataById } from 'shared/hooks/useDataById'
import { findKeyByValue } from 'shared/libs/findKeyByValue'
import { Link } from 'shared/ui/Link'
import { Rating } from 'shared/ui/Rating'

const Features = ({ features, value }) => {
	return (
		<Stack
			direction='row'
			gap={0.5}
		>
			<Typography
				variant='body1'
				color='textDisabled'
			>
				{features}:
			</Typography>
			<Typography variant='body1'>{value}</Typography>
		</Stack>
	)
}

export function ProductPage() {
	const product = useParams()

	const favorite = useFavoriteStore(state => state.favorite)
	const cart = useCartStore(state => state.cart)

	const { item, isLoading } = useDataById(product.id)
	// const data = DATA[product.id]
	const data = item

	if (isLoading) return <></>
	return (
		<Box pt={4}>
			<Container maxWidth='xl'>
				<Stack gap={2}>
					<Breadcrumbs>
						<Link to={PAGE_CONFIG.home}>Главная</Link>
						<Link to={PAGE_CONFIG.catalog}>Каталог</Link>
						<Link to={PAGE_CONFIG.catalog + '/' + findKeyByValue(data.category)}>{data.category}</Link>
						<Typography color='initial'>{data.name}</Typography>
					</Breadcrumbs>
				</Stack>
				<Box py={2}>
					<Typography variant='h4'>{data.name}</Typography>
				</Box>
				<Paper sx={{ p: 2 }}>
					<Stack
						direction='row'
						gap={8}
						justifyContent='space-between'
					>
						<Box
							width='50%'
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Box
								component='img'
								sx={{ height: 550, objectFit: 'contain', p: 4, background: '#fff' }}
								src={data.image}
								title={data.name}
							/>
						</Box>

						<Stack
							gap={2}
							sx={{ width: '40%' }}
						>
							<Box>
								{data.category === 'Мыши' ? (
									<>
										<Features
											features='Тип'
											value={data.features.type}
										/>
										<Features
											features='Сенсор'
											value={data.features.sensor}
										/>
										<Features
											features='DPI'
											value={data.features.dpi}
										/>
										<Features
											features='Кнопки'
											value={data.features.buttons}
										/>
										<Features
											features='Вес'
											value={data.features.weight}
										/>
										<Features
											features='Подключение'
											value={data.features.connection}
										/>
									</>
								) : data.category == 'Клавиатуры' ? (
									<>
										<Features
											features='Подключение'
											value={data.features.connection}
										/>
									</>
								) : (
									<></>
								)}
							</Box>
							<Stack
								direction='row'
								gap={1}
								alignItems='center'
							>
								<Chip label={<Rating rating={data.rating} />} />

								{data.inStock && (
									<Chip
										label='												В наличии
										'
										color='info'
									/>
								)}
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
							<Stack
								direction='row'
								gap={2}
								alignItems='center'
								justifyContent='space-between'
							>
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
											{Math.round(data.finalPrice)} ₽
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
							</Stack>
						</Stack>
					</Stack>
				</Paper>
			</Container>
		</Box>
	)
}
