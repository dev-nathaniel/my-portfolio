import styles from '../styles/homeStyles/Work.module.css'
import {Canvas, extend, useFrame, useLoader, useThree} from "@react-three/fiber"
import { Color, Texture, TextureLoader, Vector3} from 'three';
import * as THREE from 'three'
import { Html, shaderMaterial } from '@react-three/drei';
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import slideVertex from "raw-loader!glslify-loader!../shaders/slideVertex.vert"
import slideFragment from "raw-loader!glslify-loader!../shaders/slideFragment.frag"
import { workSlideShow } from '../data';
import {useRouter} from 'next/router'
import gsap from 'gsap';
import { Transition } from 'react-transition-group';

const SlideShaderMaterial = shaderMaterial(
    {uVelo: 0, uTime: 0, uHover: 0, uColor: new Color(1, 0.2, 1), uTexture: new Texture(), uMouse: new Vector3(), uPosition: new Vector3(), uProgress: 0, uMeshScale: new THREE.Vector2(1,1), uMeshPosition: new THREE.Vector2(0, 0), uViewSize: new THREE.Vector2(1, 1) },
    slideVertex,
    slideFragment
)

extend({SlideShaderMaterial})

const HTML = ({hovered, textRef, title}) => {
    const animate = (node) => {
        gsap.from(node, {
            y: '100%'
        })
    }
    const animateOut = (node) => {gsap.to(node, {
        y: '100%'
    })
    }
    
    return (
        <Html center style={{pointerEvents: 'none', mixBlendMode: 'difference', backgroundColor: 'transparent'}}>
            <div style={{overflow: 'hidden', height: '10vw'}}>
            <Transition
                    in={hovered}
                    onEnter={node => {animate(node)}}
                    onExit={node => {animateOut(node)}}
                    unmountOnExit
                    mountOnEnter
                    timeout={100}
                >
            <p ref={textRef} id='workName' style={{fontFamily: 'dharma M', fontSize: '10vw', mixBlendMode: 'difference', color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '5px'}}>{title}</p>
            </Transition>
            </div>

        </Html>
    )
}

const Picture = ({velo, cover, index, state, title, link}) => {
    const ref = useRef()
    const meshRef = useRef()
    const textRef = useRef()
    const ref2 = useRef()
    const [size, setSize] = useState([1, 0.7, 16, 16])
    // const hover = useRef(false)
    const [hovered, setHovered] = useState(false)
    const router = useRouter()

    const {gl} = useThree()

    const handleSize = () => {
        const screenWidth = window.innerWidth

        if (screenWidth <= 500) {
            setSize([0.7, 0.4, 16, 16])
        }
    }

    useEffect(() => {
        handleSize()
    }, [])

    window.addEventListener('resize', handleSize)
    useEffect(() => {
        gl.forceContextRestore()
        console.log('restored')
        
    }, [gl])

    useEffect(()=> {
        console.log(ref.current.uTexture)
    }, [ref.current])

    // const getViewSize = () => {
    //     const fovInRadians = (camera.fov * Math.PI) / 180;
    //     const height = Math.abs(
    //         camera.position.z * Math.tan(fovInRadians / 2) * 2
    //     );

    //     return { width: height * camera.aspect, height}
    // }

    // useEffect(() => {
    //     const viewSize = getViewSize()
    //     ref.current.uViewSize.x = viewSize.width;
    //     ref.current.uViewSize.y = viewSize.height;
    // }, [])

    const onImageClick = () => {
        
        ref.current.uMeshPosition.x = x / widthViewUnit;
        ref.current.uMeshPosition.y = y / heightViewUnit;

        ref.current.uMeshScale.x = widthViewUnit;
        ref.current.uMeshScale.y = heightViewUnit
    }
    
    const onHover = (value) => {
        ref.current.uHover = value
        // hover.current = !(hover.current)
        setHovered(!hovered)
        console.log(hovered)
    }

    const navigate = () => {
        // router.push('/works/work')
        setHovered(false)
        window.open(link, "_blank")
        // hover.current = false
    }

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'

    }, [hovered])
    const mouse = (e) => {
        ref.current.uMouse = e.point
    }
    useFrame(({clock}) => (ref.current.uTime = clock.getElapsedTime()))
    useFrame(() => {
        meshRef.current.position.x = (1.5 * index + 1) + state.x
        ref.current.uPosition = meshRef.current.position
    // console.log(ref.current.uVelo)

        // ref.current.uVelo = velo       

})

// if (hovered) {
// gsap.from(textRef.current, {
//     y: 10
// })
// }

    

    
   const [image] = useLoader(TextureLoader, [cover])
    return (
        <>
            <mesh onClick={() => navigate()} onPointerEnter={()=> onHover(1)} onPointerLeave={() => onHover(0)} onPointerMove={(e) => mouse(e)} ref={meshRef}>
                <planeGeometry ref={ref2} args={size} />
                <slideShaderMaterial uVelo={velo}  ref={ref} uTexture={image}/>
                {/* <Html style={{backgroundColor: 'red', pointerEvents: 'none'}}>
                    <div >
                        <h1>TEST</h1>
                        <h1>Test</h1>
                    </div>
                </Html> */}
                
                    <HTML title={title} hovered={hovered} textRef={textRef} />
                
            </mesh>
        </>
    )
}


const Work = ({velo, state}) => {

    
    return (
        <section id="work" className={styles.work}>
            <div className={styles.workContainer}>
                <div>
                    <p>WORK</p>
                </div>
            {/* <p className={styles.workName}>TRINAC</p> */}
            </div>

            <Canvas  style={{position: 'absolute', left: 0, top: 0, zIndex: 2, pointerEvents: 'all'}} camera={{fov: 8, position: [0, 0, 10]}} >
                
                <Suspense fallback={null}>
                    {workSlideShow.map((slide, index) => (
                        <Picture velo={velo} state={state} key={slide.id} index={index} {...slide} />
                    ))}
                </Suspense>
            </Canvas>



            {/* <div className={styles.absoluteCircle1}></div>
            <div className={styles.absoluteCircle2}></div> */}
        </section>
    );
}

export default Work;