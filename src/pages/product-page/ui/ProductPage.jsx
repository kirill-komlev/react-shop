import { Box, Container, Typography } from '@mui/material'
import { useParams } from 'react-router'
import { DATA } from 'shared/configs/data'

export function ProductPage() {
	const product = useParams()
	const data = DATA[product.id]
	console.log(Object.values(data))
	return (
		<Box pt={4}>
			<Container maxWidth='xl'>
				<Typography variant='h4'>{data.name}</Typography>
				<Typography variant='h6'>{data.price}</Typography>
			</Container>
		</Box>
	)
}
