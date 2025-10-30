import { IconButton, Tooltip } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export const AddFavorite = props => {
	return (
		<Tooltip title='Добавить в избранное'>
			<IconButton onClick={props.onClick}>
				<FavoriteBorderIcon />
			</IconButton>
		</Tooltip>
	)
}
