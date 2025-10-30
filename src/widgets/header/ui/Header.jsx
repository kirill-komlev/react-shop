import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Container, Stack } from '@mui/material'

import GamepadIcon from '@mui/icons-material/Gamepad'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { Button } from 'shared/ui/Button'
import { APP_CONFIG } from 'shared/configs/app.config'
import { Link } from 'shared/ui/Link'
import { PAGE_CONFIG } from 'shared/configs/page.config'

const drawerWidth = 240
const navItems = [
	['Товары', PAGE_CONFIG.products],
	['Акции', PAGE_CONFIG.sales],
	['О нас', PAGE_CONFIG.about],
]

export function Header(props) {
	const { window } = props
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState)
	}

	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{ px: 2 }}
		>
			<Typography
				variant='h6'
				sx={{ my: 2 }}
			>
				<Link
					to={PAGE_CONFIG.home}
					hover={false}
				>
					<Stack
						direction='row'
						spacing={1}
						alignItems='center'
					>
						{/* <Box
									component='img'
									src={APP_CONFIG.logo}
								/> */}
						<GamepadIcon></GamepadIcon>
						<Typography variant='h6'>{APP_CONFIG.name}</Typography>
					</Stack>
				</Link>
			</Typography>
			<Divider />
			<List>
				{navItems.map((item, index) => (
					<ListItem
						key={index}
						disablePadding
					>
						<ListItemButton sx={{ px: 0 }}>
							<Link
								to={item[1]}
								hover={false}
							>
								<ListItemText primary={item[0]} />
							</Link>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	const container = window !== undefined ? () => window().document.body : undefined

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar component='nav'>
				<Container
					maxWidth='xl'
					disableGutters
				>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant='h6'
							component='div'
							sx={{ display: { xs: 'none', sm: 'block' } }}
						>
							<Link
								to={PAGE_CONFIG.home}
								hover={false}
							>
								<Stack
									direction='row'
									spacing={1}
									alignItems='center'
								>
									{/* <Box
									component='img'
									src={APP_CONFIG.logo}
								/> */}
									<GamepadIcon />
									<Typography variant='h6'>{APP_CONFIG.name}</Typography>
								</Stack>
							</Link>
						</Typography>
						<Stack
							direction='row'
							gap={1}
							sx={{ display: { xs: 'none', sm: 'flex' } }}
						>
							{navItems.map((item, index) => (
								<Button
									key={index}
									variant='text'
									sx={{ color: '#fff' }}
								>
									<Link
										to={item[1]}
										hover={false}
									>
										{item[0]}
									</Link>
								</Button>
							))}
						</Stack>
						<Stack
							direction='row'
							gap={1}
						>
							<Link to={PAGE_CONFIG.favorite}>
								<IconButton>
									<FavoriteIcon sx={{ color: '#fff' }} />
								</IconButton>
							</Link>
							<Link to={PAGE_CONFIG.cart}>
								<IconButton>
									<ShoppingCartIcon sx={{ color: '#fff' }} />
								</IconButton>
							</Link>
						</Stack>
					</Toolbar>
				</Container>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</Box>
	)
}
