import { useState } from 'react'

import { Box, Container, Grid, Paper, Typography } from '@mui/material'

import { DATA } from 'shared/configs/data'

import { Button } from 'shared/ui/Button'
import { ProductCardHorizontal } from 'widgets/product-card/ui/ProductCard'

export function CatalogPage() {
	const [productCount, setProductCount] = useState(10)

	return (
		<Box
			component='section'
			pt={12}
			pb={4}
			bgcolor='#f6f6f6'
		>
			<Container
				maxWidth='xl'
				sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}
			>
				<Typography
					variant='h4'
					width='100%'
				>
					Все товары
				</Typography>
				<Box
					display='flex'
					gap={4}
				>
					<Paper>
						<Box p={2}>asdasdasd</Box>
					</Paper>
					<Grid
						container
						spacing={2}
						width='100%'
					>
						{DATA.slice(0, productCount).map((item, index) => (
							<Grid
								size={12}
								key={index}
							>
								<ProductCardHorizontal data={item} />
							</Grid>
						))}
					</Grid>
				</Box>
				<Button onClick={() => setProductCount(productCount + 4)}>Показать еще</Button>
			</Container>
		</Box>
	)
}
