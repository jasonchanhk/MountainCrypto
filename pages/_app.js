import '../styles/globals.css'
import Sidebar from '../components/sidebar'
import { AppWrapper } from '../context/state'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Sidebar>
        <Component {...pageProps} />
      </Sidebar>
    </AppWrapper>
  )
}

export default MyApp
