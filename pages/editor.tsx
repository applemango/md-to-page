import { Md_render } from "../lib/render"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import styles from "../styles/editor.module.scss"
import style from "./article/main.module.scss"

import Code from "../lib/code"
import 'highlight.js/styles/atom-one-dark.css';
import highlight from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';highlight.registerLanguage('python', python);
import typescript from 'highlight.js/lib/languages/typescript';highlight.registerLanguage('typescript', typescript);
import javascript from 'highlight.js/lib/languages/javascript';highlight.registerLanguage('javascript', javascript);
import xml from 'highlight.js/lib/languages/xml';highlight.registerLanguage('xml', xml);
import shell from 'highlight.js/lib/languages/shell';highlight.registerLanguage('shell', shell);
import ruby from 'highlight.js/lib/languages/ruby';highlight.registerLanguage('ruby', ruby);
import clojure from 'highlight.js/lib/languages/clojure';highlight.registerLanguage('clojure', clojure);
import markdown from 'highlight.js/lib/languages/markdown';highlight.registerLanguage('markdown', markdown);

export function Editor() {
    //const x = '{"type":"link_h1","link":"/"} Hello, world!\n{"type":"back"}/\n## why hello world?\nhello, world is good program because it"s very simple\n####### *_javascript_ ->* `console.log("hello, world!")`\n####### *_python_ ->* `print("hello, world!")`\n### this is test\n[\n```typescript\nfunction blog({ html, name }: Props) {\n    useEffect(() => {highlight.initHighlighting();});\n    return (\n        <div>\n            <Link href="/"><a>back</a></Link>\n            <h1>name : {name}</h1>\n            <Md_render data={html} />\n        </div>\n    )\n}\n```\n]'
    const x = '\n{"type":"link_h1","link":"/"} Hello, world!\n{"type":"back"}/\n## why hello world?\nhello, world is good program because it"s very simple\n####### *_javascript_ ->* `console.log("hello, world!")`\n####### *_python_ ->* `print("hello, world!")`\n### this is test\n#### _create_ and _run_ next.js\n[\n```shell\n#create app\nnpx create-next-app@latest --ts\n\ncd AppName\n\n#add sass\nyarn add sass\n\n#run port 3000\nnpm run dev\n```\n]\n#### hello, world!\n[\n```python\nprint("hello, world!")\n```\n```typescript\nconsole.log("hello, world!")\n```\n```javascript\nconsole.log("hello, world!")\n```\n```ruby\np "hello, world!"\n```\n]\n[\n```typescript\nfunction blog({ html, name }: Props) {\n    useEffect(() => {highlight.initHighlighting();});\n    return (\n        <div>\n            <Link href="/"><a>back</a></Link>\n            <h1>name : {name}</h1>\n            <Md_render data={html} />\n        </div>\n    )\n}\n```\n]'
    const [md,setMd] = useState(x)
    const [showEditor, setShowEditor] = useState(true)
    const [showOutput, setShowOutput] = useState(true)
    useEffect(() => {
        highlight.initHighlighting();
    },[md,showEditor,showOutput]);
    return (
        <div className = { styles.main }>
            { showEditor && (
                    <div className = {` ${styles.textarea} ${showOutput ? "" : styles.textarea_max_width } `}>
                        <textarea value={md} onChange={(event) => {setMd(event.target.value)}}></textarea>
                    </div>
                )
            }
            { showOutput && (
                <div className = {` ${styles.border} ${ showEditor ? "" : styles.border_background}`}>
                    <div onClick={() => setShowEditor(!showEditor)}><p>{showEditor ? "hide" : "show"}</p></div>
                </div>
            )}
            { !showOutput && (
                <div className = {` ${styles.border} ${styles.border_}`}></div>
            )}
            { showEditor && (
                <div className = {` ${styles.border} ${!showEditor ? styles.border_pointer_event:""} ${ !showOutput ? styles.border_position : ""}`}>
                    <div onClick={() => {if(showEditor){setShowOutput(!showOutput)}}}><p>{showOutput ? "hide" : "show"}</p></div>
                </div>
            )}
            { showOutput && (
                <div className = { styles.output }>
                    <div className = {style.main}>
                        <Md_render data={md} />
                    </div>
                </div>
            )}
        </div>
    )
}
export default Editor
/*
            <div className = { styles.textarea }>
                <div>   
                    <textarea value={md} onChange={(event) => {setMd(event.target.value)}}></textarea>
                </div>
                <div className = { styles.code}>
                    <Code name={null} lang={"markdown"}>{md}</Code>
                </div>
            </div>
*/