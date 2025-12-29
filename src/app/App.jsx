import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router'
import { Router } from './router/Router'
import { ThemeProvider } from './providers/theme-provider/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<BrowserRouter>
					<CssBaseline />
					<Router />
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
