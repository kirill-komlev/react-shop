import { Route, Routes } from 'react-router'

import { Layout } from 'app/layouts/Layout'

import { HomePage } from 'pages/home-page/ui/HomePage'
import { CatalogCategoryPage } from 'pages/catalog-category-page/ui/CatalogCategoryPage'

import { PAGE_CONFIG } from 'shared/configs/page.config'

export function Router() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route
					path={PAGE_CONFIG.home}
					element={<HomePage />}
				/>
				<Route
					path={PAGE_CONFIG.catalog}
					element={<>asd</>}
				/>
				<Route
					path={`${PAGE_CONFIG.catalog}/:category`}
					element={<CatalogCategoryPage />}
				/>
				<Route
					path={`${PAGE_CONFIG.product}/:id`}
					element={
						<>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime sint iure cupiditate, est sapiente delectus vitae at. Voluptatum voluptatem, aperiam explicabo eaque
							magni placeat itaque inventore ratione quisquam excepturi error! magni placeat itaque inventore ratione quisquam excepturi error! magni placeat itaque inventore
							ratione quisquam excepturi error! magni placeat itaque inventore ratione quisquam excepturi error! ratione quisquam excepturi error! magni placeat itaque inventore
							ratione quisquam excepturi error! ratione quisquam excepturi error! magni placeat itaque inventore ratione quisquam excepturi error! ratione quisquam excepturi error!
							magni placeat itaque inventore ratione quisquam excepturi error! ratione quisquam excepturi error! magni placeat itaque inventore ratione quisquam excepturi error!
							ratione quisquam excepturi error! magni placeat itaque inventore ratione quisquam excepturi error! ratione quisquam excepturi error! magni placeat itaque inventore
							ratione quisquam excepturi error! ratione quisquam excepturi error! magni placeat itaque inventore ratione quisquam excepturi error! ratione quisquam excepturi error!
							magni placeat itaque inventore ratione quisquam excepturi error! ratione quisquam excepturi error! magni placeat itaque inventore ratione quisquam excepturi error!
							ratione quisquam excepturi error! magni placeat itaque inventore ratione quisquam excepturi error! ratione quisquam excepturi error! magni placeat itaque inventore
							ratione quisquam excepturi error! ratione quisquam excepturi error! ratione quisquam excepturi error! ratione quisquam excepturi error! ratione quisquam excepturi
							error! ratione quisquam excepturi error!
						</>
					}
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
				<Route
					path={PAGE_CONFIG.favorite}
					element={<>lorem</>}
				/>
			</Route>
		</Routes>
	)
}
