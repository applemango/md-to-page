import data from "../../lib/data"
import { Md_render } from "../../lib/render"

import styles from "./main.module.scss"

import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import DefaultErrorPage from 'next/error'
import Link from 'next/link'

import Head from 'next/head'
import Heads from "../components/heads"

import Code from "../../lib/components/code"
import 'highlight.js/styles/atom-one-dark.css';
import highlight from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';highlight.registerLanguage('python', python);
import typescript from 'highlight.js/lib/languages/typescript';highlight.registerLanguage('typescript', typescript);
import javascript from 'highlight.js/lib/languages/javascript';highlight.registerLanguage('javascript', javascript);
import xml from 'highlight.js/lib/languages/xml';highlight.registerLanguage('xml', xml);
import shell from 'highlight.js/lib/languages/shell';highlight.registerLanguage('shell', shell);
import ruby from 'highlight.js/lib/languages/ruby';highlight.registerLanguage('ruby', ruby);
import clojure from 'highlight.js/lib/languages/clojure';highlight.registerLanguage('clojure', clojure);

interface Props {
    html: any
    name: string
    date: string
    tags: string[]
    details: string
}
export async function getStaticProps(context: any) {
    const name = context.params.name
    const r = await data(String(context.params.name))
    const html = r.data
    const date = r.date
    const tags = r.tags
    const details = r.seo_details
    if(!html) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            html
            ,name
            ,date
            ,tags
            ,details
        }
    }
}
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

function Blog({ html, name, date, tags, details }: Props) {
    useEffect(() => {highlight.highlightAll()/*highlight.initHighlighting()*/;});
    return (
        <div className = { styles.main }>
            <Heads title = { name } description={details}/>
            <Md_render data={html} name={name} date={date} tags={tags} />
        </div>
    )
}
//<h1>{`name = ${name}, date = ${date}`}</h1>
/*
            <h1>{name}</h1>
            <Link href="/"><a>back</a></Link>
*/
//<div dangerouslySetInnerHTML={{__html:html}}></div>
/*
    return (
        <div className = { styles.main }>
            <Link href="/"><a>back</a></Link>
            <h1>name : {name}</h1>
            <Md_render data={html} />
        </div>
    )
*/
/*
    const [code, setCode] = useState("print('hello')")
    useEffect(() => {
        highlight.initHighlighting();
    },[code]);
    return (
        <div className = { styles.main }>
            <textarea value={code} onChange={(event) => {setCode(event.target.value)}}></textarea>
            <Code lang={["python"]} name={["python"]} >{[code]}</Code>
        </div>
    )
*/
export default Blog