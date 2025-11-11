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
	const productsInCart = DATA.filter(item => cart.indexOf(item.id) != -1)

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
					<Stack gap={2}>
						{productsInCart.map((item, index) => (
							<CartItem
								key={index}
								data={item}
							/>
						))}
					</Stack>
				</Box>
				<Box mt='auto'>
					<Button fullWidth>Перейти в корзину</Button>
				</Box>
			</Box>
		</Drawer>
	)
}
