import Layout from '@/components/Layout'
import { StockifyProvider } from '../StockifyContext'


export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <StockifyProvider>
        <Component {...pageProps} />
      </StockifyProvider>
    </Layout>
  )
}
