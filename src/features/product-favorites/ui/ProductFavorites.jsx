import { IconButton, Tooltip } from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { useFavoriteStore } from 'shared/libs/favorites-store'

export const AddFavorite = id => {
	const addFavorite = useFavoriteStore(state => state.addFavorite)
	let productId = id.id
	return (
		<Tooltip title='Добавить в избранное'>
			<IconButton onClick={() => addFavorite(productId)}>
				<FavoriteBorderIcon />
			</IconButton>
		</Tooltip>
	)
}

export const DeleteFavorite = id => {
	const deleteFavorite = useFavoriteStore(state => state.deleteFavorite)
	let productId = id.id
	return (
		<Tooltip title='Убрать из избранного'>
			<IconButton onClick={() => deleteFavorite(productId)}>
				<FavoriteIcon color='error' />
			</IconButton>
		</Tooltip>
	)
}
