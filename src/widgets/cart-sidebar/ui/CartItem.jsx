import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { calculateDiscount } from 'shared/libs/calculateDiscount'

export function CartItem({ data }) {
	return (
		<Stack
			direction='row'
			alignItems='center'
			gap={2}
		>
			<Box
				component='img'
				src={data.image}
				height='64px'
				p={1}
				bgcolor='white'
				borderRadius={1}
			/>
			<Stack gap={1}>
				<Typography variant='h6'>
					{data.name}
					{data.length}
				</Typography>
				{data.discount == 0 ? (
					<Typography variant='body1'>{calculateDiscount(data.price, data.discount)} ₽</Typography>
				) : (
					<Stack
						direction='row'
						gap={0.5}
					>
						<Typography
							variant='body1'
							color='secondary'
						>
							{calculateDiscount(data.price, data.discount)} ₽
						</Typography>
						<Typography
							variant='caption'
							sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
						>
							{data.price} ₽
						</Typography>
					</Stack>
				)}
			</Stack>
			<Tooltip title='Удалить из корзины'>
				<IconButton sx={{ ml: 'auto' }}>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	)
}
