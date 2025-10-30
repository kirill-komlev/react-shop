import { Link as RouterLink } from 'react-router'

import { Link as MaterialLink } from '@mui/material'

export function Link({ to, children, hover = true }) {
	return (
		<MaterialLink
			component={RouterLink}
			color='inherit'
			underline='none'
			to={to}
			sx={
				hover
					? {
							'&:hover': {
								color: 'primary.main', // Color on hover
							},
					  }
					: {}
			}
		>
			{children}
		</MaterialLink>
	)
}
