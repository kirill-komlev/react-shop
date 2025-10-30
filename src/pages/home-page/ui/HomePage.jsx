import { Box, Container, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { DATA } from 'shared/configs/data'
import { Button } from 'shared/ui/Button'
import { ProductCard } from 'widgets/product/product-card/ui/ProductCard'

export function HomePage() {
	// const [cart, setCart] = useState([])

	// const addInCart = id => {
	// 	// let copy = Object.assign([], cart)
	// 	// copy.push(id)
	// 	// setCart(copy)
	// 	// localStorage.setItem('cart', copy)
	// 	setCart([...cart, id])
	// }

	return (
		<Box
			component='section'
			mt={10}
		>
			<Container
				maxWidth='xl'
				sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}
			>
				<Typography variant='h4'>Популярные товары</Typography>
				<Grid
					container
					spacing={2}
					width='100%'
				>
					{DATA.slice(0, 4).map((item, index) => (
						<Grid
							size={3}
							key={index}
						>
							<ProductCard data={item} />
						</Grid>
					))}
				</Grid>
				<Button>Посмотреть все</Button>
			</Container>
		</Box>
	)
}
