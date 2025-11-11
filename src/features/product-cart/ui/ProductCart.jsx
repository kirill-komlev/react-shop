import { IconButton, Tooltip } from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import { Button } from 'shared/ui/Button'
import { useCartStore } from 'app/providers/store-provider/StoreProvider'
import { useState } from 'react'

export const AddCart = id => {
	const addCart = useCartStore(state => state.addCart)
	let productId = id.id
	return (
		<Tooltip title='Добавить в корзину'>
			<IconButton
				onClick={() => addCart(productId)}
				sx={{
					'&:hover': {
						color: 'primary.dark',
					},
				}}
			>
				<AddShoppingCartIcon color='inherit' />
			</IconButton>
		</Tooltip>
	)
}

export const AddCartFull = id => {
	const addCart = useCartStore(state => state.addCart)
	let productId = id.id
	return (
		<Button
			onClick={() => addCart(productId)}
			startIcon={<AddShoppingCartIcon />}
		>
			Купить
		</Button>
	)
}

export const DeleteCart = id => {
	const [isHover, setIsHover] = useState(false)
	const deleteCart = useCartStore(state => state.deleteCart)
	let productId = id.id
	return (
		<Tooltip title='Убрать из корзины'>
			<IconButton
				onClick={() => deleteCart(productId)}
				onMouseOver={() => setIsHover(true)}
				onMouseOut={() => setIsHover(false)}
			>
				{isHover ? <RemoveShoppingCartIcon color='error' /> : <ShoppingCartIcon color='primary' />}
			</IconButton>
		</Tooltip>
	)
}

export const DeleteCartFull = id => {
	const [isHover, setIsHover] = useState(false)
	const deleteCart = useCartStore(state => state.deleteCart)
	let productId = id.id
	return (
		<Button
			variant='outlined'
			color={isHover ? 'error' : 'primary'}
			startIcon={isHover ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />}
			onClick={() => deleteCart(productId)}
			onMouseOver={() => setIsHover(true)}
			onMouseOut={() => setIsHover(false)}
		>
			{isHover ? 'Убрать' : 'В корзине'}
		</Button>
	)
}
