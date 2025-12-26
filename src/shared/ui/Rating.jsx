import { Rating as MuiRating, Stack, Typography } from '@mui/material'

export const Rating = ({ rating }) => (
	<Stack
		direction='row'
		alignItems='center'
		gap={1}
	>
		<MuiRating
			name='read-only'
			value={rating}
			precision={0.1}
			readOnly
		/>
		<Typography
			variant='body1'
			sx={{ mt: '2px' }}
		>
			{rating}
		</Typography>
	</Stack>
)
