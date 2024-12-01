import { useState } from 'react'
import styles from './pill.module.css'

const Pill = ({text, onClick, clicked, setClicked, state}) => {
    const click = () => {
        setClicked(!clicked)
        onClick()
    }
    return (
        <li style={{color: clicked && (state == text) && 'black', backgroundColor: clicked && (state == text) && 'white'}} onClick={click} className={styles.pill}>
            {text}
        </li>
    );
}

export default Pill;