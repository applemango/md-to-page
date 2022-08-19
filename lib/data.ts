import fs from "fs"
import path from "path"
const dir = path.join(process.cwd(), "md"/*"pages/md"*/)

export default function data(path_: any) {
    const json = JSON.parse(fs.readFileSync(path.join(dir, "_config.json"), "utf8"))
    if(!path_){ return json }
    try {
        const fullPath = path.join(dir, path_ + ".md")
        const md = fs.readFileSync(fullPath, "utf8")
        if(json[path_]["public"]) {
            return {"data":md,"date":json[path_]["date"],"tags":json[path_]["tags"],"seo_details":json[path_]["seo_details"]}
        } else {return false}
    } catch (e) {
        return false
    }
}