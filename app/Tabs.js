export default class Tabs {
    constructor(max, parent) {
        this.parent = parent
        this.max = max
        this.fields = new Map()
        this.count = 0
        this._initObject()
    }

    _initObject() {
        const object = document.createElement("div")
        object.className = "tabs"
        const nav = document.createElement("nav")
        const content = document.createElement("div")
        content.className = "content"
        object.appendChild(nav)
        object.appendChild(content)
        this.parent.appendChild(object)
        this.fields.set(object,new Map())
    }

    addItem(title, text, deletable = false) {
        
        let button = this._createButton(title)
        let content = this._createContent(text)
        let curr = null

        for(let key of this.fields.keys()) {
            if(this.fields.get(key).size < this.max){
                curr = key
                this.fields.get(key).set(button,content)
            }
        }

        if(!curr) {
            this._initObject()
        }

        for(let key of this.fields.keys()) {
            if(this.fields.get(key).size <= this.max){
                curr = key
                this.fields.get(key).set(button,content)
            }
        }

        button.addEventListener("click", () => {
            for(let value of this.fields.get(curr).values()) {
                value.className = ""
            }
            for(let value of this.fields.get(curr).keys()) {
                value.className = ""
            }
            if(button.className == "active") {
                button.className = ""
                content.className = ""
            }
            else {
                button.className = "active"
                content.className = "active"
            }

        })
        if(deletable) {
            
            const rem = document.createElement("button")
            rem.addEventListener("click", () => {
                button.parentElement.removeChild(button)
                content.parentElement.removeChild(content)
                this.fields.get(curr).delete(button)
            })
            rem.innerHTML = "delete"
            content.appendChild(rem)
        }

        curr.querySelector("nav").appendChild(button)
        curr.querySelector(".content").appendChild(content)
        this.count++
    }

    _createButton(title) {
        const button = document.createElement("button")
        button.setAttribute("target", this.count)
        button.innerHTML = title
        return button
    }

    _createContent(text) {
        const p = document.createElement("p")
        p.setAttribute("id", this.count)
        p.innerHTML = text
        return p
    }

}