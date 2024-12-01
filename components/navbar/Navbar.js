import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './navbar.module.css'
import {useRouter} from 'next/router'

const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const [close, setClose] = useState(false)
    const ref = useRef()
    const path = useRef()
    const path2 = useRef()
    const text = useRef()
    const router = useRouter()
    const [trans, setTrans] = useState(false)

    useEffect(() => {
        router.prefetch('/')
        router.prefetch('/works')
        router.prefetch('/contact')
    }, [router])

    // useEffect(() => {
    //     const animStart = async () => {
    //         await setTrans(true)
    //         await gsap.timeline()
    //         .fromTo(path2.current, {
    //             attr: {d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'}
    //         }, {
    //             duration: 0.8,
    //             ease: 'power4.in',
    //             attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z'}
    //         }, 0)
    //         .to(path2.current, {
    //             duration: 0.3,
    //             ease: 'power2',
    //             attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'}
    //         });
    //     }

    //     const animEnd = async () => {
            
    //         setTimeout(async()=> {
    //             console.log('ended')
    //         setMenu(false)
    //         await gsap.timeline({
    //             onComplete: () => {
    //                 gsap.to(path2.current, {
    //                     attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z'},
    //                 })
                    
    //             }
    //         })
    //         // .set(path.current, { 
    //         //     attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
    //         // })
    //         .fromTo(path2.current, {
    //             attr: {d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z'}
    //         }, { 
    //             duration: 0.3,
    //             ease: 'power2.in',
    //             attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
    //         });
    //         setTrans(false)

    //         }, 1100)
    //     }
    //     router.events.on('routeChangeStart', animStart)
    //     router.events.on('routeChangeComplete', animEnd)
    //     router.events.on('routeChangeError', animEnd)

    //     return () => {
    //         router.events.off('routeChangeStart', animStart)
    //         router.events.off('routeChangeComplete', animEnd)
    //         router.events.off('routeChangeError', animEnd)
    //     }
    // }, [router])

    const toggle = () => {
        if (!menu) {
            setMenu(true)
        } else {
            setClose(true)
        }
    }

    const transition = (link) => {
        router.push(link)
        setClose(true)
    }
    
    const linkToggle = () => {
        setMenu(!menu)
    }

    useEffect(() => {
    if (menu) {
        // console.log(menu)
        gsap.timeline()
        // .set(document.getElementsByClassName('menuText'), {
        //     y: '100%'
        // })
        // .set(path.current, {
        //     attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'}
        // })
        .fromTo(path.current, {
            attr: {d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'}
        }, {
            duration: 0.8,
            ease: 'power4.in',
            attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z'}
        }, 0)
        .to(path.current, {
            duration: 0.3,
            ease: 'power2',
            attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'}
        })
        
        .to(document.getElementsByClassName('menuText'), {
            y: 0,
            stagger: true
        })
    }
}, [menu])
useEffect(()=> {
    if(close) {
        gsap.timeline({
            onComplete: () => {
                gsap.to(path.current, {
                    attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z'},
                    onComplete: () => {
                        setClose(false)
                        setMenu(false);
                    }
                })
                
            }
        })
        // .set(path.current, { 
        //     attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
        // })
        .to(document.getElementsByClassName('menuText'), {
            y: '100%'
        })
        .fromTo(path.current, {
            attr: {d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z'}
        }, { 
            duration: 0.3,
            ease: 'power2.in',
            attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
        })
        // .fromTo(path.current, {
        //     attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z'}
        // }, { 
        //     duration: 0.7,
        //     ease: 'power4',
        //     attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' },
            
        // })
    }
}, [close])


    const downloadPDF = () => {
        const pdfURL = 'resume2.pdf'
        const fileName = "Adebayo's resume"
        fetch(pdfURL)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = fileName
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)
            })
    }
    return (
        <div>
            <div className={styles.navBar}>
                <div onClick={() => toggle()} className={styles.menuButton}>
                    <p>{!menu ? 'MENU' : 'CLOSE'}</p>
                    <p>{!menu ? 'MENU' : 'CLOSE'}</p>
                </div>
            </div>


            {trans ? <svg className={styles.overlay2} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path ref={path2} stroke='#222' fill='#222' className={styles.overlay__path2} vectorEffect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
                </svg>
                : null }

            {menu ? <div className={`${styles.menu}`}>
                <svg className={styles.overlay} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path ref={path} stroke='#222' fill='#222' className={styles.overlay__path} vectorEffect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
                </svg>
                <div className={styles.menuCont}>
                    <div>
                    <div className='a' onClick={() => transition('/')}><p ref={text} className='menuText'>INDEX</p></div>
                    </div>
                    <div>
                    <div className='a' onClick={() => transition('/works')}><p className='menuText'>WORKS</p></div>
                    </div>
                    <div>
                    <a style={{cursor: 'pointer'}} ref={ref} onClick={downloadPDF}><p className='menuText'>RESUME</p></a>
                    </div>
                    <div>
                    <div className='a' onClick={() => transition('/contact')}><p className='menuText'>CONTACT</p></div>
                    </div>
                </div>
            </div>
            : null}
        </div>
    );
}

export default Navbar;
