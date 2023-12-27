import InitUser from '@/components/initUser'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
export default function App({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
    <InitUser/>
    <Component {...pageProps} />
  </RecoilRoot>

}
