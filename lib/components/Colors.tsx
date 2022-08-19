import { ReactNode, useState } from 'react'
import styles from "./styles/colors.module.scss"

type Props = {
    color : string[] | string
}
export default function Colors({color}:Props) {
    if(!Array.isArray(color)) {
        return (
            <div></div>
        )
    }
    return (
        <div className={ styles.main }>
            {color.map((color, index) => (
                <div key = {index} style={{
                    width: 100/color.length+"%"
                    ,backgroundColor: color.indexOf(":") != -1 ? color.slice(0,color.indexOf(":")) : color
                }}
                    className = { styles.color }
                ><p style={{
                    color: color.indexOf(":") != -1 ? color.slice(color.indexOf(":")+1) : ""
                }}>{color.indexOf(":") != -1 ? color.slice(0,color.indexOf(":")) : color}</p></div>
            ))}
        </div>
    )
}