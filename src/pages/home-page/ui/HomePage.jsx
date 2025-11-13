import { Box, Container, Grid, Stack, Typography } from '@mui/material'

import { ProductCard } from 'widgets/product-card/ui/ProductCard'

import { DATA } from 'shared/configs/data'
import { Button } from 'shared/ui/Button'

export function HomePage() {
	return (
		<>
			<Box
				height={'700px'}
				sx={{
					mt: -8,
					backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), URL('/images/background.png')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<Container
					maxWidth='xl'
					sx={{ height: '100%' }}
				>
					<Stack
						gap={2}
						justifyContent='center'
						alignItems='flex-start'
						height='100%'
					>
						<Typography variant='h2'>Победа начинается здесь</Typography>
						<Button size='large'>Перейти в каталог</Button>
					</Stack>
				</Container>
			</Box>
			<Container
				maxWidth='xl'
				sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}
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
		</>
	)
}
