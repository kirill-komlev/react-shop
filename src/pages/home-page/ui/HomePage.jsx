import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { lightBlue, blue } from '@mui/material/colors'

import { ProductCard } from 'widgets/product-card/ui/ProductCard'

import { DATA } from 'shared/configs/data'
import { Button } from 'shared/ui/Button'
import Particles from 'shared/ui/Particles/Particles'

export function HomePage() {
	return (
		<>
			<Box
				height={'700px'}
				sx={{
					mt: -8,
					backgroundColor: 'primary.main',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					position: 'relative',
				}}
			>
				<Particles
					particleColors={['#ffffff', '#ffffff']}
					particleCount={200}
					particleSpread={10}
					speed={0.1}
					particleBaseSize={100}
					moveParticlesOnHover={true}
					alphaParticles={false}
					disableRotation={false}
				/>
				<Container
					maxWidth='xl'
					sx={{ height: '100%' }}
				>
					<Stack
						gap={2}
						justifyContent='center'
						alignItems='center'
						height='100%'
					>
						<Typography
							variant='h2'
							color='white'
							sx={{ zIndex: 999 }}
						>
							Победа начинается здесь
						</Typography>
						<Button
							size='large'
							// variant='outlined'
							color='inherit'
							sx={{ zIndex: 999 }}
						>
							Перейти в каталог
						</Button>
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
