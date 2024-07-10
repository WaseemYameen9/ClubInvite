import React from 'react'
import styles from './Buttons.module.css'

function Buttons(props){
    return(
        <button className={styles.button20} onClick={props.onClick}>{props.title}</button>
    )
}

export default Buttons;