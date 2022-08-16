import { ReactNode, useState } from 'react'
import styles from "./colors.module.scss"

type Props = {
    colors : string[] | string
}
export default function Colors({colors}:Props) {
    if(!Array.isArray(colors)) {
        return (
            <div></div>
        )
    }
    return (
        <div className={ styles.main }>
            {colors.map((color, index) => (
                <div style={{
                    width: 100/colors.length+"%"
                    ,backgroundColor: color
                }}
                    className = { styles.color }
                >{color}</div>
            ))}
        </div>
    )
}