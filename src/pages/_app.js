import Layout from '@/components/Layout'
import { StockifyProvider } from '../StockifyContext'
import { AuthProvider } from '../authContext';


export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <StockifyProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      </StockifyProvider>
    </Layout>
  )
}
