import { Route, Routes } from 'react-router'

import { Layout } from 'app/layouts/Layout'

import { HomePage } from 'pages/home-page/ui/HomePage'
import { CatalogCategoryPage } from 'pages/catalog-category-page/ui/CatalogCategoryPage'

import { PAGE_CONFIG } from 'shared/configs/page.config'
import { FavoritePage } from 'pages/favorite-page/ui/FavoritePage'
import { CatalogPage } from 'pages/catalog-page/ui/CatalogPage'
import { ProductPage } from 'pages/product-page/ui/ProductPage'

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
					element={<CatalogPage />}
				/>
				<Route
					path={`${PAGE_CONFIG.catalog}/:category`}
					element={<CatalogCategoryPage />}
				/>
				<Route
					path={`${PAGE_CONFIG.product}/:id/:name`}
					element={<ProductPage />}
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
					element={<FavoritePage />}
				/>
			</Route>
		</Routes>
	)
}
