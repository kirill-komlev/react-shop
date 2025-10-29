import { Box, Container, Grid, Typography } from '@mui/material'
import { DATA } from 'shared/configs/data'
import { Button } from 'shared/ui/Button'
import { ProductCard } from 'widgets/product/productCard/ui/ProductCard'

export function HomePage() {
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
