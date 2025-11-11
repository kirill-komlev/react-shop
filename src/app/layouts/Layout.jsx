import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { CartSidebar } from 'widgets/cart-sidebar/ui/CartSidebar'
import { Header } from 'widgets/header/ui/Header'

export function Layout() {
	return (
		<>
			<Header />
			<Box mt={8}>
				<Outlet />
			</Box>
			<CartSidebar />
		</>
	)
}
