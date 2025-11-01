import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
