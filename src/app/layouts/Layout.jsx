import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { CartSidebar } from 'widgets/cart-sidebar/ui/CartSidebar'
import { Header } from 'widgets/header/ui/Header'

export function Layout() {
	return (
		<>
			<Header />
			<Box
				component='section'
				mt={8}
				minHeight='100vh'
			>
				<Outlet />
			</Box>
			<CartSidebar />
		</>
	)
}
