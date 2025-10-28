import { Layout } from 'app/layouts/Layout'
import { Route, Routes } from 'react-router'
import { PAGE_CONFIG } from 'shared/configs/page.config'

export function Router() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route
					path={PAGE_CONFIG.home}
					element={<>lorem</>}
				/>
				<Route
					path={PAGE_CONFIG.products}
					element={<>lorem</>}
				/>
				<Route
					path={PAGE_CONFIG.sales}
					element={<>lorem</>}
				/>
				<Route
					path={PAGE_CONFIG.about}
					element={<>lorem</>}
				/>
				<Route
					path={PAGE_CONFIG.cart}
					element={<>lorem</>}
				/>
			</Route>
		</Routes>
	)
}
