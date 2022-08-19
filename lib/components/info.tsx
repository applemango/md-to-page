import { ReactNode, useState } from 'react'
import Link from "next/link"
import styles from "./styles/info.module.scss"

type Props = {
    info : any
}
export default function Info({info}:Props) {
    if(!info.date) {info.date = "1970-01-01"}
    if(!info.name) {info.name = "Cannot be specified in editor"}
    if(!info.tags) {info.tags = ["Cannot be specified in editor"]}
    return (
        <div className={ styles.main }>
            <div className={ styles.info }>
                <p className={ styles.time}>{info.date}</p>
                <div className={ styles.space }></div>
                <div className={ styles.tags}>
                    { info.tags && info.tags.map((tag:any, index:any) => (
                        <div key={index} className={ styles.tag}>
                            <p>{tag}</p>
                        </div>
                ))}
                </div>
            </div>
            <div>
                <Link href="/"><a className = {styles.link_back}>back</a></Link>
            </div>
        </div>
    )
}