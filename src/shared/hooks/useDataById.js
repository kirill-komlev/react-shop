import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useDataById(id) {
	const { data, isLoading } = useQuery({
		queryKey: ['item', id],
		queryFn: async () => {
			return axios.get(`https://69136428f34a2ff1170bcfdd.mockapi.io/api/v1/products/${id}`)
		},
		select: data => data.data,
	})

	return { item: data, isLoading }
}
