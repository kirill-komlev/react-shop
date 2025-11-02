import { TextField } from '@mui/material'

export function Input(props) {
	return (
		<TextField
			variant='outlined'
			fullWidth
			{...props}
		/>
	)
}
