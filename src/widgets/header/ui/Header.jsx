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
import { Badge, Container, Menu, MenuItem, Stack, Tooltip } from '@mui/material'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import GamepadIcon from '@mui/icons-material/Gamepad'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { Button } from 'shared/ui/Button'
import { Link } from 'shared/ui/Link'

import { PAGE_CONFIG } from 'shared/configs/page.config'
import { APP_CONFIG } from 'shared/configs/app.config'

import { CATEGORIES } from 'shared/configs/categories'

import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { useFavoriteStore } from 'shared/libs/favorites-store'
import { useCartStore } from 'shared/libs/cart-store'

const drawerWidth = 240
const navItems = [
	// ['Товары', PAGE_CONFIG.product],
	['Акции', PAGE_CONFIG.sales],
	['О нас', PAGE_CONFIG.about],
]

const LinkButtonStyle = {
	px: 2,
	color: '#fff',
	backgroundColor: 'primary.main',
	'&:hover': {
		backgroundColor: 'primary.dark',
	},
	'.MuiButton-endIcon': {
		marginLeft: '0',
	},
}

export function Header(props) {
	const { window } = props
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const favorite = useFavoriteStore(state => state.favorite)
	const cart = useCartStore(state => state.cart)

	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState)
	}

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
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
						<GamepadIcon />
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
			<AppBar
				component='nav'
				sx={{ backgroundImage: 'none' }}
			>
				<Container
					maxWidth='xl'
					disableGutters
				>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<IconButton
							color='primary'
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
									sx={{ color: 'primary.dark' }}
								>
									{/* <Box
									component='img'
									src={APP_CONFIG.logo}
								/> */}
									<SportsEsportsIcon />
									<Typography variant='h6'>{APP_CONFIG.name}</Typography>
								</Stack>
							</Link>
						</Typography>
						<Stack
							direction='row'
							gap={1}
							sx={{ display: { xs: 'none', sm: 'flex' } }}
						>
							<Button
								variant='text'
								sx={LinkButtonStyle}
								id='basic-button'
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
								endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							>
								Каталог
							</Button>
							<Menu
								id='basic-menu'
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								slotProps={{
									list: {
										'aria-labelledby': 'basic-button',
									},
								}}
							>
								{CATEGORIES.map((item, index) => (
									<Link
										to={`${PAGE_CONFIG.catalog}/${item.en[1]}`}
										hover={false}
										key={index}
									>
										<MenuItem onClick={handleClose}>{capitalizeFirstLetter(item.ru[1])}</MenuItem>
									</Link>
								))}
							</Menu>
							{navItems.map((item, index) => (
								<Link
									key={index}
									to={item[1]}
									hover={false}
								>
									<Button
										variant='text'
										sx={LinkButtonStyle}
									>
										{item[0]}
									</Button>
								</Link>
							))}
						</Stack>
						<Stack
							direction='row'
							gap={1}
							sx={{ display: { xs: 'none', sm: 'flex' } }}
						>
							<Link to={PAGE_CONFIG.favorite}>
								<Tooltip title='Избранное'>
									<IconButton>
										<Badge
											max={9}
											color='primary'
											badgeContent={favorite.length}
										>
											<FavoriteIcon />
										</Badge>
									</IconButton>
								</Tooltip>
							</Link>
							<Link to={PAGE_CONFIG.cart}>
								<Tooltip title='Корзина'>
									<IconButton>
										<Badge
											max={9}
											color='primary'
											badgeContent={cart.length}
										>
											<ShoppingCartIcon />
										</Badge>
									</IconButton>
								</Tooltip>
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
