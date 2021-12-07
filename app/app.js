import Tabs from "./Tabs.js";
const parent = document.querySelector(".right-box")
const tabs = new Tabs(3, parent)
import { URL } from "./ref.js";



const tabsControl = document.forms.tabs_control
const title = tabsControl.elements.title
const text = tabsControl.elements.text
const add = tabsControl.elements.add
const save = tabsControl.elements.save

fetch(URL)
.then(r => r.text())
.then(text => {
    let items = JSON.parse(text)
    for(let item of Object.getOwnPropertyNames(items)) {
        tabs.addItem(item, items[item], true)
    }
})
add.addEventListener("click", () => {
    for(let field of tabs.fields.values()){
        for(let nav of field.keys()) {
            if(nav.innerHTML == title.value) {
                alert("Exist tab")
                return
            }
        }
    }
    tabs.addItem(title.value,text.value, true)
})


save.addEventListener("click", () =>{
    let body = {}
    for(let field of tabs.fields.values()){
        for(let nav of field.keys()) {
            let content = field.get(nav).innerHTML
            let newContent = ""
            for(let char of content){
                if(char == "<") {
                    break
                }
                newContent += char
            }
            body[nav.innerHTML] = newContent
        }
    }

    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(body)
    
    }).then(r => r.text()).then(r => console.log(r))
})