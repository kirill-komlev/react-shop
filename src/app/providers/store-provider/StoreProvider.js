import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create()(
	persist(
		set => ({
			cart: [],
			addCart: id => set(state => ({ cart: [...state.cart, id] })),
			deleteCart: id => set(state => ({ cart: state.cart.filter(item => item !== id) })),
		}),
		{
			name: 'cart',
		}
	)
)

export const useCartDrawerStore = create()(
	persist(
		set => ({
			cartDrawer: false,
			openCartDrawer: () => set({ cartDrawer: true }),
			closeCartDrawer: () => set({ cartDrawer: false }),
		}),
		{
			name: 'cartDrawer',
		}
	)
)

export const useFavoriteStore = create()(
	persist(
		set => ({
			favorite: [],
			addFavorite: id => set(state => ({ favorite: [...state.favorite, id] })),
			deleteFavorite: id => set(state => ({ favorite: state.favorite.filter(item => item !== id) })),
		}),
		{
			name: 'favorite',
		}
	)
)

export const useProductDirection = create()(
	persist(
		set => ({
			productDirection: 'horizontal',
			setProductVertical: () => set({ productDirection: 'vertical' }),
			setProductHorizontal: () => set({ productDirection: 'horizontal' }),
		}),
		{
			name: 'productDirection',
		}
	)
)
