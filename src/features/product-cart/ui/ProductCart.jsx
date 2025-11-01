import { IconButton, Tooltip } from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

import { Button } from 'shared/ui/Button'
import { useCartStore } from 'shared/libs/cart-store'

export const AddCart = id => {
	const addCart = useCartStore(state => state.addCart)
	let productId = id.id
	return (
		<Tooltip title='Добавить в корзину'>
			<IconButton onClick={() => addCart(productId)}>
				<ShoppingCartIcon color='inherit' />
			</IconButton>
		</Tooltip>
	)
}

export const AddCartFull = id => {
	const addCart = useCartStore(state => state.addCart)
	let productId = id.id
	return <Button onClick={() => addCart(productId)}>Купить</Button>
}

export const DeleteCart = id => {
	const deleteCart = useCartStore(state => state.deleteCart)
	let productId = id.id
	return (
		<Tooltip title='Убрать из корзины'>
			<IconButton onClick={() => deleteCart(productId)}>
				<RemoveShoppingCartIcon color='error' />
			</IconButton>
		</Tooltip>
	)
}

export const DeleteCartFull = id => {
	const deleteCart = useCartStore(state => state.deleteCart)
	let productId = id.id
	return (
		<Button
			variant='outlined'
			onClick={() => deleteCart(productId)}
		>
			В корзине
		</Button>
	)
}
