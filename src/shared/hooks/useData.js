import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useData() {
	const { data, isLoading } = useQuery({
		queryKey: ['items'],
		queryFn: async () => {
			return axios.get('https://69136428f34a2ff1170bcfdd.mockapi.io/api/v1/products')
		},
		select: data => data.data,
	})

	return { items: data, isLoading }
}
