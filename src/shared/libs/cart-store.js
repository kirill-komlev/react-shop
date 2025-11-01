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
