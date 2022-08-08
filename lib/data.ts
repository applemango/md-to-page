import fs from "fs"
import path from "path"
const dir = path.join(process.cwd(), "pages/md")

export default function data(path_: any) {
    const json = JSON.parse(fs.readFileSync(path.join(dir, "_config.json"), "utf8"))
    if(!path_){ return json }
    try {
        const fullPath = path.join(dir, path_ + ".md")
        const md = fs.readFileSync(fullPath, "utf8")
        if(json[path_]["public"]) {
            return md
        } else {return false}
    } catch (e) {
        return false
    }
}