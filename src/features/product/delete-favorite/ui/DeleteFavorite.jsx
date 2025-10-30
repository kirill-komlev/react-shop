import { IconButton, Tooltip } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

export const DeleteFavorite = props => {
	return (
		<Tooltip title='Убрать из избранного'>
			<IconButton onClick={props.onClick}>
				<FavoriteIcon color='error' />
			</IconButton>
		</Tooltip>
	)
}
