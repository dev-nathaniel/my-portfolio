import { Curtains, useCurtains, useCurtainsEvent } from 'react-curtains'
import Navbar from '../components/navbar/Navbar'
import '../styles/globals.css'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
// import '../components/_barba'

function MyApp({ Component, pageProps }) {

  const contextLost = (curtains) => {
    console.log('lost')
    curtains.restoreContext()
  }
  return (
    // <Curtains>
    // <div data-barba='wrapper'>
    <>
      <Navbar />
      <Component {...pageProps} />
      <GoogleAnalytics gaId='G-S6YBBYN3QE' />
      <GoogleTagManager gtmId='GTM-5D2LS33Z' />
    </>
    // </div> 
    // </Curtains>
  )
}

export default MyApp
