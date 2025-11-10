import { IconButton, Tooltip } from '@mui/material'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'

import { useFavoriteStore } from 'shared/libs/favorites-store'
import { useState } from 'react'

export const AddFavorite = id => {
	const addFavorite = useFavoriteStore(state => state.addFavorite)
	let productId = id.id
	return (
		<Tooltip title='Добавить в избранное'>
			<IconButton onClick={() => addFavorite(productId)}>
				<FavoriteBorderIcon
					sx={{
						'&:hover': {
							color: 'primary.dark',
						},
					}}
				/>
			</IconButton>
		</Tooltip>
	)
}

export const DeleteFavorite = id => {
	const [isHover, setIsHover] = useState(false)
	const deleteFavorite = useFavoriteStore(state => state.deleteFavorite)
	let productId = id.id
	return (
		<Tooltip title='Убрать из избранного'>
			<IconButton
				onClick={() => deleteFavorite(productId)}
				onMouseOver={() => setIsHover(true)}
				onMouseOut={() => setIsHover(false)}
			>
				{isHover ? <HeartBrokenIcon color='error' /> : <FavoriteIcon color='primary' />}
			</IconButton>
		</Tooltip>
	)
}
