import Layout from '@/components/Layout'
import { StockifyProvider } from '../StockifyContext'
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <SessionProvider session={pageProps.session}>
        <StockifyProvider>
          <Component {...pageProps} />
        </StockifyProvider>
      </SessionProvider>
    </Layout>
  )
}
