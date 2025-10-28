import { Outlet } from 'react-router'
import { Header } from 'widgets/header/ui/Header'

export function Layout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
