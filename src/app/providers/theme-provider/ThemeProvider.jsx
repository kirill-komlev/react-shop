import { createTheme, ThemeProvider as MuiThemeProvider, alpha } from '@mui/material'
import { COLORS } from 'shared/configs/color.config'

const theme = createTheme({
	cssVariables: {
		nativeColor: true,
	},
	palette: {
		white: {
			main: '#f7f7f7',
			light: '#ffffff',
			dark: '#f1f1f1',
			contrastText: '#000000',
		},
		// mode: 'dark',
		// primary: {
		// 	main: alpha(COLORS.primary, 0.7),
		// 	light: alpha(COLORS.primary, 0.5),
		// 	dark: alpha(COLORS.primary, 0.9),
		// },
		// secondary: {
		// 	main: alpha(COLORS.secondary, 0.7),
		// 	light: alpha(COLORS.secondary, 0.5),
		// 	dark: alpha(COLORS.secondary, 0.9),
		// },
		text: {
			// primary: '#f1f5f9',
			// secondary: '#94a3b8',
		},

		dark: {
			// background: {
			// 	paper: '#181818',
			// 	default: '#161616',
			// },
		},
	},
})

export function ThemeProvider({ children }) {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
