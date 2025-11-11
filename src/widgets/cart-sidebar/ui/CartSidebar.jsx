import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useCartDrawerStore, useCartStore } from 'app/providers/store-provider/StoreProvider'

import { CartItem } from './CartItem'

import { DATA } from 'shared/configs/data'
import { Button } from 'shared/ui/Button'

export function CartSidebar() {
	const cart = useCartStore(state => state.cart)
	const cartDrawer = useCartDrawerStore(state => state.cartDrawer)
	const closeCartDrawer = useCartDrawerStore(state => state.closeCartDrawer)

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

	return (
		<Drawer
			anchor='right'
			open={cartDrawer}
			onClose={closeCartDrawer}
			sx={{ display: { xs: 'none', sm: 'block' } }}
		>
			<Box
				py={2}
				px={3}
				display='flex'
				flexDirection='column'
				gap={4}
				width='450px'
			>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
				>
					<Typography variant='h4'>Корзина</Typography>
					<IconButton onClick={closeCartDrawer}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<Box>
					<Stack gap={3}>
						{productsInCart.map((item, index) => (
							<CartItem
								key={index}
								data={item}
							/>
						))}
					</Stack>
				</Box>
				<Stack
					mt='auto'
					gap={1}
				>
					<Stack
						direction='row'
						alignItems='center'
						justifyContent='space-between'
					>
						<Typography variant='h6'>Итог: </Typography>
						{discount == 0 ? (
							<Typography variant='body1'>{productsWithDiscount} ₽</Typography>
						) : (
							<Stack
								direction='row'
								gap={0.5}
							>
								<Typography
									variant='h6'
									color='secondary'
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
					<Button fullWidth>Перейти в корзину</Button>
				</Stack>
			</Box>
		</Drawer>
	)
}
