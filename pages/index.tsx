import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import styles from './components/styles/index.module.scss'

import Link from 'next/link'

import data from "../lib/data"

import Head from 'next/head'
import Heads from "./components/heads"


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
    //const onePage = 30
    const [onePage,setOneCode] = useState(6)
    const nowPage = page == null ? 0 : Number(page)
    const data = page ? result.slice(Number(page)*onePage,(Number(page)+1)*onePage) : result.slice(0,onePage)
    return (
        //<h1>{Object.keys(list)}</h1>
        //<h1>{list["test"]["public"].toString()}</h1>
        <div className={styles.main}>
            <Heads title={"example"} description={"example"} />
            <div className = {styles.title}>
                <h1>example</h1>
                <h2>example in example</h2>
            </div>
            <div className = {styles.posts}>
                { Object.entries(data).map(([key],index) => 
                    <Link href={ data[key]["link"] } key = { index }>
                        <a>
                            <div className={styles.post} >
                                <h2>
                                    { data[key]["title"] }
                                </h2>
                                <p>{ data[key]["details"] }</p>
                            </div>
                        </a>
                    </Link>
                )}
            </div>
            { Math.ceil(result.length/onePage) > 1 &&
                <div className = {styles.next}>
                    { result.slice((Number(page)-1)*onePage,Number(page)*onePage).length != 0 ? (<Link href = {{ pathname: "/", query: { page: nowPage - 1 } }} ><a>prev</a></Link>) : (<div/>)}
                    <div>
                        <p>{`page ${nowPage+1} of ${Math.ceil(result.length/onePage)}`}</p>
                    </div>
                    { result.slice((Number(page)+1)*onePage,(Number(page)+2)*onePage).length != 0 ? (<Link href = {{ pathname: "/", query: { page: nowPage + 1 } }} ><a>next</a></Link>) : (!(result.length > 10 && page == null) && <div/>)}
                    { (result.length > 10 && page == null) && (<Link href = {{ pathname: "/", query: { page: nowPage + 1 } }} ><a>next</a></Link>)}
                </div>
            }
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

//<Link href={ data[key]["link"] }><a>{ data[key]["title"] }</a></Link>

/*
    ,"test2": {"public": true,"details":"test post"}
    ,"hello2": {"public": true,"details":"hello, world! is good program"}
    ,"editor2": {"public": true,"details":"simple markdown editor"}
    ,"syntax2": {"public": true,"details":"markdown syntax"}
    ,"a2": {"public": false,"details":""}
    ,"test2a": {"public": true,"details":"test post"}
    ,"hello2a": {"public": true,"details":"hello, world! is good program"}
    ,"editor2a": {"public": true,"details":"simple markdown editor"}
    ,"syntax2a": {"public": true,"details":"markdown syntax"}
    ,"a2a": {"public": false,"details":""}
    ,"test2b": {"public": true,"details":"test post"}
    ,"hello2b": {"public": true,"details":"hello, world! is good program"}
    ,"editor2b": {"public": true,"details":"simple markdown editor"}
    ,"syntax2b": {"public": true,"details":"markdown syntax"}
    ,"a2b": {"public": false,"details":""}
    ,"test2ab": {"public": true,"details":"test post"}
    ,"hello2ab": {"public": true,"details":"hello, world! is good program"}
    ,"editor2ab": {"public": true,"details":"simple markdown editor"}
    ,"syntax2ab": {"public": true,"details":"markdown syntax"}
    ,"a2ab": {"public": false,"details":""}
    ,"test2c": {"public": true,"details":"test post"}
    ,"hello2c": {"public": true,"details":"hello, world! is good program"}
    ,"editor2c": {"public": true,"details":"simple markdown editor"}
    ,"syntax2c": {"public": true,"details":"markdown syntax"}
    ,"a2c": {"public": false,"details":""}
    ,"test2ac": {"public": true,"details":"test post"}
    ,"hello2ac": {"public": true,"details":"hello, world! is good program"}
    ,"editor2ac": {"public": true,"details":"simple markdown editor"}
    ,"syntax2ac": {"public": true,"details":"markdown syntax"}
    ,"a2ac": {"public": false,"details":""}
    ,"test2bc": {"public": true,"details":"test post"}
    ,"hello2bc": {"public": true,"details":"hello, world! is good program"}
    ,"editor2bc": {"public": true,"details":"simple markdown editor"}
    ,"syntax2bc": {"public": true,"details":"markdown syntax"}
    ,"a2bc": {"public": false,"details":""}
    ,"test2abc": {"public": true,"details":"test post"}
    ,"hello2abc": {"public": true,"details":"hello, world! is good program"}
    ,"editor2abc": {"public": true,"details":"simple markdown editor"}
    ,"syntax2abc": {"public": true,"details":"markdown syntax"}
    ,"a2abc": {"public": false,"details":""}
    ,"test2d": {"public": true,"details":"test post"}
    ,"hello2d": {"public": true,"details":"hello, world! is good program"}
    ,"editor2d": {"public": true,"details":"simple markdown editor"}
    ,"syntax2d": {"public": true,"details":"markdown syntax"}
    ,"a2d": {"public": false,"details":""}
    ,"test2ad": {"public": true,"details":"test post"}
    ,"hello2ad": {"public": true,"details":"hello, world! is good program"}
    ,"editor2ad": {"public": true,"details":"simple markdown editor"}
    ,"syntax2ad": {"public": true,"details":"markdown syntax"}
    ,"a2ad": {"public": false,"details":""}
    ,"test2bd": {"public": true,"details":"test post"}
    ,"hello2bd": {"public": true,"details":"hello, world! is good program"}
    ,"editor2bd": {"public": true,"details":"simple markdown editor"}
    ,"syntax2bd": {"public": true,"details":"markdown syntax"}
    ,"a2bd": {"public": false,"details":""}
    ,"test2abd": {"public": true,"details":"test post"}
    ,"hello2abd": {"public": true,"details":"hello, world! is good program"}
    ,"editor2abd": {"public": true,"details":"simple markdown editor"}
    ,"syntax2abd": {"public": true,"details":"markdown syntax"}
    ,"a2abd": {"public": false,"details":""}
    ,"test2cd": {"public": true,"details":"test post"}
    ,"hello2cd": {"public": true,"details":"hello, world! is good program"}
    ,"editor2cd": {"public": true,"details":"simple markdown editor"}
    ,"syntax2cd": {"public": true,"details":"markdown syntax"}
    ,"a2cd": {"public": false,"details":""}
    ,"test2acd": {"public": true,"details":"test post"}
    ,"hello2acd": {"public": true,"details":"hello, world! is good program"}
    ,"editor2acd": {"public": true,"details":"simple markdown editor"}
    ,"syntax2acd": {"public": true,"details":"markdown syntax"}
    ,"a2acd": {"public": false,"details":""}
    ,"test2bcd": {"public": true,"details":"test post"}
    ,"hello2bcd": {"public": true,"details":"hello, world! is good program"}
    ,"editor2bcd": {"public": true,"details":"simple markdown editor"}
    ,"syntax2bcd": {"public": true,"details":"markdown syntax"}
    ,"a2bcd": {"public": false,"details":""}
    ,"test2abcd": {"public": true,"details":"test post"}
    ,"hello2abcd": {"public": true,"details":"hello, world! is good program"}
    ,"editor2abcd": {"public": true,"details":"simple markdown editor"}
    ,"syntax2abcd": {"public": true,"details":"markdown syntax"}
    ,"a2abcd": {"public": false,"details":""}
*/