import { IconButton, Tooltip } from '@mui/material'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

export const DeleteCart = props => {
	return (
		<Tooltip title='Убрать из корзины'>
			<IconButton onClick={props.onClick}>
				<RemoveShoppingCartIcon color='error' />
			</IconButton>
		</Tooltip>
	)
}
