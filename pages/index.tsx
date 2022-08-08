import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import styles from '../styles/Home.module.scss'
import Header from "../lib/header"

import Link from 'next/link'

import data from "../lib/data"



interface Props {
    result: any
}
export async function getStaticProps() {
    const list = await data(null)
    let result: any = []
    Object.keys(list).forEach(function (key) {
        if (list[key]["public"]) {
            result.push({
                "title":key
                ,"details":list[key]["details"]
                ,"link":"article/"+key
            })
        }
    })
    return {
        props: {
            result
        }
    }
}

export default function Home ({ result }: Props) {
    const router = useRouter()
    const { page } = router.query
    const onePage = 10
    const nowPage = page == null ? 0 : Number(page)
    const data = page ? result.slice(Number(page)*onePage,(Number(page)+1)*onePage) : result.slice(0,onePage)
    return (
        //<h1>{Object.keys(list)}</h1>
        //<h1>{list["test"]["public"].toString()}</h1>
        <div>
            <div>
                { Object.entries(data).map(([key],index) => 
                    <div key = { index } >
                        <h2>
                            <Link href={ data[key]["link"] }>
                                <a>{ data[key]["title"] }</a>
                            </Link>
                        </h2>
                        <p>{ data[key]["details"] }</p>
                    </div>
                )}
            </div>
            <div>
                { result.slice((Number(page)-1)*onePage,Number(page)*onePage).length != 0 && (<Link href = {{ pathname: "/", query: { page: nowPage - 1 } }} ><a>prev</a></Link>)}
                { result.slice((Number(page)+1)*onePage,(Number(page)+2)*onePage).length != 0 && (<Link href = {{ pathname: "/", query: { page: nowPage + 1 } }} ><a>next</a></Link>)}
                { (result.length > 10 && page == null) && (<Link href = {{ pathname: "/", query: { page: nowPage + 1 } }} ><a>next</a></Link>)}
            </div>
        </div>
    )
}
//const Home: NextPage = () => {
//    const x = (
//        <p>Hello, world!</p>
//    )
//    const y = (
//        "<p>hello, world!</p>"
//    )
//    return (
//        <div>
//            <Header />
//            <h1>Hello, world!</h1>
//            {x}
//            <div dangerouslySetInnerHTML={{__html:y}}></div>
//        </div>
//    )
//}
//export default Home
