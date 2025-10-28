import { Button as MuiButton } from '@mui/material'

export function Button({ children, ...props }) {
	return (
		<MuiButton
			variant='contained'
			size='medium'
			{...props}
		>
			{children}
		</MuiButton>
	)
}
