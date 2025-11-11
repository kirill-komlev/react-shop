import { createTheme, ThemeProvider as MuiThemeProvider, alpha } from '@mui/material'
import { COLORS } from 'shared/configs/color.config'

const theme = createTheme({
	cssVariables: {
		nativeColor: true,
	},
	palette: {
		mode: 'dark',
		primary: {
			main: alpha(COLORS.primary, 0.7),
			light: alpha(COLORS.primary, 0.5),
			dark: alpha(COLORS.primary, 0.9),
		},
		secondary: {
			main: alpha(COLORS.secondary, 0.7),
			light: alpha(COLORS.secondary, 0.5),
			dark: alpha(COLORS.secondary, 0.9),
		},
		text: {
			// primary: '#f1f5f9',
			// secondary: '#94a3b8',
		},

		// background: {
		// 	paper: '#0f1117',
		// 	default: '#181c25',
		// },
	},
})

export function ThemeProvider({ children }) {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
