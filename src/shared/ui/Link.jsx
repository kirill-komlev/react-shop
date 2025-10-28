import { Link as RouterLink } from 'react-router'

import { Link as MaterialLink } from '@mui/material'

export function Link({ to, children }) {
	return (
		<MaterialLink
			component={RouterLink}
			color='inherit'
			underline='none'
			to={to}
		>
			{children}
		</MaterialLink>
	)
}
