import { BottomNavigation, BottomNavigationAction } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export function MobileHeader() {
	return (
		<BottomNavigation
			sx={{
				display: { md: 'none' },
				width: '100%',
				position: 'fixed',
				bottom: 0,
				zIndex: '4',
			}}
			showLabels
		>
			<BottomNavigationAction
				label='Главная'
				icon={<HomeIcon />}
			/>
			<BottomNavigationAction
				label='Каталог'
				icon={<MenuBookIcon />}
			/>
			<BottomNavigationAction
				label='Корзина'
				icon={<ShoppingCartIcon />}
			/>
		</BottomNavigation>
	)
}
