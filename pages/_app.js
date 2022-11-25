import '../styles/globals.css'
import { Inter } from '@next/font/google'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TaskContextProvider } from '../context/TasksContext';
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry:0
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskContextProvider>
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
    </TaskContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
