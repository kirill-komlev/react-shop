import { Box, Container, Stack, Typography, Grid, Paper, Tooltip, IconButton, Snackbar } from '@mui/material'
import { useCartStore, useFavoriteStore } from 'app/providers/store-provider/StoreProvider'
import { DATA } from 'shared/configs/data'
import { calculateDiscount } from 'shared/libs/calculateDiscount'
import { declensionOfNumber } from 'shared/libs/declensionOfNumber'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import { AddFavorite, DeleteFavorite } from 'features/product-favorites/ui/ProductFavorites'
import { Button } from 'shared/ui/Button'
import { useState } from 'react'

const CartItem = ({ data }) => {
	const deleteCart = useCartStore(state => state.deleteCart)

	const favorite = useFavoriteStore(state => state.favorite)

	return (
		<Stack
			direction='row'
			alignItems='center'
			gap={2}
		>
			<Box
				component='img'
				src={data.image}
				height='64px'
				p={1}
				bgcolor='white'
				borderRadius={1}
			/>
			<Stack gap={1}>
				<Typography variant='h6'>
					{data.name}
					{data.length}
				</Typography>
				<Stack
					direction='row'
					gap={2}
				>
					{data.discount == 0 ? (
						<Typography variant='body1'>{calculateDiscount(data.price, data.discount)} ₽</Typography>
					) : (
						<Stack
							direction='row'
							gap={0.5}
						>
							<Typography
								variant='body1'
								color='primary'
							>
								{calculateDiscount(data.price, data.discount)} ₽
							</Typography>
							<Typography
								variant='caption'
								sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
							>
								{data.price} ₽
							</Typography>
						</Stack>
					)}
					{data.inStock && <Typography variant='subtitle2'>В наличии</Typography>}
				</Stack>
			</Stack>
			<Stack
				direction='row'
				gap={1}
				sx={{ ml: 'auto' }}
			>
				{favorite.indexOf(data.id) == -1 ? <AddFavorite id={data.id} /> : <DeleteFavorite id={data.id} />}
				<Tooltip title='Удалить из корзины'>
					<IconButton onClick={() => deleteCart(data.id)}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</Stack>
		</Stack>
	)
}

export function CartPage() {
	const cart = useCartStore(state => state.cart)
	const clearCart = useCartStore(state => state.clearCart)

	// Нахождения товаров, которые должны быть в корзине
	let productsWithDiscount = 0
	let productsWithoutDiscount = 0
	let discount = 0

	const productsInCart = DATA.filter(item => {
		if (cart.indexOf(item.id) != -1) {
			discount += item.discount
			productsWithoutDiscount += item.price
			productsWithDiscount += Math.round((item.price / 100) * (100 - item.discount))
			return true
		}
		return false
	})

	const [open, setOpen] = useState(false)

	const handleClick = () => {
		setOpen(true)
		clearCart()
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const action = (
		<IconButton
			size='small'
			aria-label='close'
			color='inherit'
			onClick={handleClose}
		>
			<CloseIcon fontSize='small' />
		</IconButton>
	)

	return (
		<Box pt={4}>
			<Container maxWidth='xl'>
				<Stack
					direction='row'
					gap={1}
					alignItems='flex-end'
					sx={{ mb: 4 }}
				>
					<Typography variant='h4'>Корзина</Typography>
					<Typography
						variant='subtitle1'
						color='textDisabled'
					>
						{cart.length} {declensionOfNumber(cart.length, ['товар', 'товара', 'товаров'])}
					</Typography>
				</Stack>
				<Stack
					direction='row'
					gap={4}
				>
					<Paper sx={{ flex: 2, p: 2, mb: 4 }}>
						<Stack
							gap={2}
							flex={2}
						>
							{productsInCart.map(item => (
								<CartItem data={item}></CartItem>
							))}
						</Stack>
					</Paper>
					<Paper sx={{ flex: 1, height: '100%', p: 2 }}>
						<Stack gap={2}>
							<Typography variant='h5'>Условия заказа</Typography>
							<Box>
								<Typography variant='body2'>Итого:</Typography>
								<Stack
									direction='row'
									justifyContent='space-between'
									alignItems='center'
								>
									<Typography
										variant='body1'
										sx={{ fontWeight: 700 }}
									>
										{cart.length} {declensionOfNumber(cart.length, ['товар', 'товара', 'товаров'])}
									</Typography>
									{discount == 0 ? (
										<Typography
											variant='body1'
											sx={{ fontWeight: 700 }}
										>
											{productsWithDiscount} ₽
										</Typography>
									) : (
										<Stack
											direction='row'
											gap={0.5}
										>
											<Typography
												variant='h6'
												color='primary'
												sx={{ fontWeight: 700 }}
											>
												{productsWithDiscount} ₽
											</Typography>
											<Typography
												variant='caption'
												sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
											>
												{productsWithoutDiscount} ₽
											</Typography>
										</Stack>
									)}
								</Stack>
							</Box>
							<Button onClick={handleClick}>Оформить заказ</Button>
							<Snackbar
								open={open}
								autoHideDuration={2000}
								onClose={handleClose}
								message='Заказ оформлен'
								action={action}
							/>
						</Stack>
					</Paper>
				</Stack>
			</Container>
		</Box>
	)
}
