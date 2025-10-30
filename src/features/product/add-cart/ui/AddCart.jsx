import { IconButton, Tooltip } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export const AddCart = props => {
	return (
		<Tooltip title='Добавить в корзину'>
			<IconButton onClick={props.onClick}>
				<ShoppingCartIcon color='inherit' />
			</IconButton>
		</Tooltip>
	)
}
