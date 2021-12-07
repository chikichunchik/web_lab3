import Tabs from "./Tabs.js";
import { URL } from "./ref.js";
const parent = document.querySelector(".right-box")
const menu = new Tabs(3,parent)

fetch(URL)
.then(r => r.text())
.then(text => {
    let items = JSON.parse(text)
    for(let item of Object.getOwnPropertyNames(items)) {
        menu.addItem(item,items[item])
    }
})