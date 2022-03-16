import '../styles/globals.css'
import Sidebar from '../components/sidebar'
import { AppWrapper } from '../context/state'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Sidebar>
        <NextNProgress color="#312E81"/>
        <Component {...pageProps} />
      </Sidebar>
    </AppWrapper>
  )
}

export default MyApp
