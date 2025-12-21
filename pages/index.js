import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import About from '../components/About'
import Contact from '../components/Contact'
import Loading from '../components/Loading'
import Me from '../components/Me'
import Work from '../components/Work'
import styles from '../styles/Home.module.css'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  // const [state, setState] = useState({x: 0})
  // const [size, setSize] = useState({x: 0, y: 0})
  // const [velo, setVelo] = useState(0)

  useEffect(() => {
    return () => {
      const tl = gsap.timeline()
    }
  }, [])

  // Use refs instead of state for values that update 60fps/on-scroll to avoid re-renders
  const stateRef = useRef({ x: 0 })
  const veloRef = useRef(0)

  useEffect(() => {
    let ctx = gsap.context(() => {
      //       ScrollTrigger.scrollerProxy('#main', {pinType: 'transform', 
      //   scrollTop(value) {
      //     return arguments.length ? document.querySelector('#main').scrollTop = value : document.querySelector('#main').scrollTop;
      //   },
      //   getBoundingClientRect() {
      //     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      //   }
      // })


      // gsap.timeline( {
      //     scrollTrigger: {
      //         trigger: '#about',
      //         // scroller: '#main',
      //         scrub: true,
      //         pin: true,
      //         start: 'top top',
      //         end: '+=100%'
      //     },
      // })
      // // .to('#svg', {
      // //     strokeDashoffset: 0,
      // //     duration: 13
      // //   })
      // //   .to('#text', {
      // //     y: -100,
      // //     opacity: 0,
      // //     duration: 5
      // //   })
      // //   .to('#svg', {
      // //     opacity: 0,
      // //     duration: 5
      // //   })
      //   .to('#story', {
      //     y: -700,
      //     duration: 20
      //   });



      const changeColorToWhite = (p) => {
        gsap.to(p, { color: 'white' })
      }
      const changeColorToGrey = (p) => {
        gsap.to(p, { color: 'rgba(255, 255, 255, 0.2)' })
      }

      window.addEventListener('scroll', () => {
        const div = gsap.getProperty('#story', 'y')
        let ps = gsap.utils.toArray('#p')
        ps.forEach((p, i) => {
          if (div < (-355 - (75 * i))) {
            changeColorToWhite(p)
          } else if (div === 0) {
            changeColorToGrey(p)
          }
        })
      })

      const tl = gsap.timeline(
        {
          scrollTrigger: {
            trigger: '#work',
            // scroller: '#main',
            scrub: true,
            onUpdate: self => {
              // Update ref instead of state
              veloRef.current = self.getVelocity() * 0.0005
            },
            pin: true,
            start: 'center center',
            end: '+=100%',
          },
          defaults: { ease: 'none' }
        }
      );

      // Animate the ref object property
      tl.to(stateRef.current, {
        x: -5.5,
      })
    })

    return () => ctx.revert()
  }, [])
  console.log(veloRef.current)

  return (
    <div className={styles.smoothScroll}>
      <Head>
        <title>Adebayo Olowofoyeku</title>
        <meta name="description" content="Adebayo Olowofoyeku's portfolio. A full stack developer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Scope+One&display=swap" rel="stylesheet"></link>
      </Head>

      <Me />
      <About />
      {/* Pass refs instead of values */}
      <Work veloRef={veloRef} stateRef={stateRef} />
      <Contact />

    </div>
  )
}

