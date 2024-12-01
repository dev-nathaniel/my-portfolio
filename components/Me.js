import styles from '../styles/homeStyles/Me.module.css'
import { Suspense, useEffect, useRef, useState } from 'react';
import {Canvas, extend, useFrame, useLoader} from "@react-three/fiber"
import { Color, Texture, TextureLoader, Vector2, Vector3 } from 'three';
import fragment from "raw-loader!glslify-loader!../shaders/fragment.frag"
import vertex from "raw-loader!glslify-loader!../shaders/vertex.vert"
import { shaderMaterial } from '@react-three/drei';
import Navbar from './navbar/Navbar';



const MyShaderMaterial = shaderMaterial(
    { uTime: 0, uColor: new Color(1, 0.2, 1), uTexture: new Texture() },
    vertex,
    fragment
)

extend({MyShaderMaterial})


const Wave = () => {
    const ref = useRef()
    const meshRef = useRef()
    useFrame(({clock}) => (ref.current.uTime = clock.getElapsedTime()))


    // const hover = (pointer) => {
    //     const lastname = document.getElementById('lastname')
    //     const canvas = document.getElementById('canvas')
    //     lastname.style.zIndex = pointer == 'over' ? -1 : -2
    //     canvas.style.zIndex = pointer == 'over' ? -2 : -1
    //     console.log(pointer)
    // }

    const [image] = useLoader(TextureLoader, ['me.webp'])
    return (
        <mesh position={new Vector3(0, -0.05, 0)} ref={meshRef}>
            <planeGeometry args={[0.4, 0.4, 16, 16]} />
            <myShaderMaterial  ref={ref} uTexture={image}/>
        </mesh>
    )
}
const Me = () => {
    const [innerWidth, setInnerWidth] = useState()

    const getInnerWidth = () => {
        setInnerWidth(window.innerWidth)
        // console.log(innerWidth)
    }

    useEffect(() => {
        getInnerWidth()
        window.addEventListener('resize', getInnerWidth)

        return () => {
            window.removeEventListener('resize', getInnerWidth)
        }
    })
    
    return (
        <>
        {/* <Navbar /> */}
        <section id="me" className={styles.me}>
            <div className={styles.meMain}>
                <div className={styles.meMainContainer}>
                    <div className={styles.firstName}>
                        <p id='top' >ADEBAYO</p>
                        <p >A SOFTWARE</p>
                    </div>
                    { innerWidth <= 500 ?
                    <div>
                        <img style={{width: '100%'}} src='me.webp' />
                    </div>
                    : null
                    }
                    <div data-scroll data-scroll-speed="1" id='lastname' className={styles.lastName}>
                        <p>OLOWOFOYEKU</p>
                        <p>DEVELOPER</p>
                    </div>
                    {/* <div className='spin'>
                        <img alt='spin' width={160} height={160} src='../media/scroll.svg' />
                    </div> */}
                </div>
            </div>
            <Canvas id='canvas' camera={{fov: 8, position: [0, 0, 5]}} style={{position: 'absolute', left: 0, top: 0, zIndex: -1}}>
                
                <Suspense fallback={null}>
                    <Wave />
                </Suspense>
            </Canvas>
        </section>
        </>
    );
}

export default Me;