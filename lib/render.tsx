import { render_sub, render_code, render_json_, render_math, render_info } from "./render_"
import styles from "./span_styles.module.scss"

export function Md_render(d: any) {
    if(!d.data) { return <div></div> }
    let result = [];
    const data = d.data
    const data_array = data.split("\n")
    
    const md_list = [
        "#","##","###","####","#####","######","#######"
    ]

    while (data_array.length) {
        let isShift = false;
        let isChange = false;
        const now = data_array[0]
        const md_f = now.slice(0,now.indexOf(" "))
        const md_f_data = now.slice(now.indexOf(" ")+1)
        
        if(!now || now == "" || now == "\r") {
            result.push(<div className = { styles.br }/>)
            data_array.shift()
            isShift = true
            isChange = true
            continue;
        }

        if (md_list.includes(md_f)) {
            if(["#","##","###","####","#####","######","#######"].includes(md_f)) {
                result.push(render_sub(md_f,md_f_data))
            }
            data_array.shift()
            isShift = true
            isChange = true
            continue;
        }
        
        if ((now == "[\r" || now == "[") && (data_array.includes("]") || data_array.includes("]\r"))) {
            let t = [];
            let n = false;
            let s = 0;
            data_array.shift()
            while ((data_array[0] != "]" && data_array[0] != "]\r") || n && !(s < 100000)) {
                if(data_array[0] && data_array[0].slice(0,3) == "```") {
                    n = !n
                }
                t.push(data_array[0])
                data_array.shift()
                s++
            }
            data_array.shift()
            result.push(render_code(t))
            isShift = true
            isChange = true
            continue;
        }

        if(md_f[0] == "{" && md_f[md_f.length - 1] == "}") {
            try {
                const json = JSON.parse(md_f)
                const res = render_json_(json, md_f_data)
                if(res) {
                    result.push(res)
                    data_array.shift()
                    isShift = true
                    isChange = true
                    continue;
                }
            } catch (e) {
            }
        }

        if((now == "```math" || now == "```math\r") && (data_array.includes("```") || data_array.includes("```\r"))) {
            let t = ""
            let s = 0;
            data_array.shift()
            while ((data_array[0] != "```" && data_array[0] != "```\r") || !(s < 100000)) {
                t = t+data_array[0]
                data_array.shift()
                s++
            }
            data_array.shift()
            result.push(render_math(t))
            isShift = true
            isChange = true
            continue;
        }

        if(now.slice(0,3) == ":::") {
            let t = [];
            let n = false;
            let s = 0;
            let b = false;
            let type = now.slice(3,-1)
            data_array.shift()
            while ((data_array[0] != ":::" && data_array[0] != ":::\r") || n && !(s < 100000)) {
                if(data_array.length < 1) {b = true;break}
                t.push(data_array[0])
                data_array.shift()
                s++
            }
            if(b) {
                break
            }
            data_array.shift()
            result.push(render_info(t, type))
            isShift = true
            isChange = true
            continue;
        }

        if (!isChange && !isShift) {
            result.push(<p className = { styles.p }>{now}</p>)
            data_array.shift()
        }
        //if (!isShift) {data_array.shift()}
    }

    //console.log(data_array)
    return (
        <div>
            {[result]}
        </div>
    )
}