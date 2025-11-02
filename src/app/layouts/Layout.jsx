import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { Header } from 'widgets/header/ui/Header'

export function Layout() {
	return (
		<>
			<Header />
			<Box mt={8}>
				<Outlet />
			</Box>
		</>
	)
}
