import { Box, Container, Grid, Typography } from '@mui/material'

import { ProductCard } from 'widgets/product-card/ui/ProductCard'

import { DATA } from 'shared/configs/data'
import { Button } from 'shared/ui/Button'

export function HomePage() {
	return (
		<Box
			component='section'
			mt={12}
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
							size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
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
