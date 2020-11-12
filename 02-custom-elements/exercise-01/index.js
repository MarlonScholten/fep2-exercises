class LightSwitch extends HTMLElement{
    constructor() {
        super();
        this.bulb = document.createElement("div");
        this.bulb.classList.add("light-bulb");
        this.bulb.style.backgroundColor = 'grey';
        this.button = document.createElement("button");
        this.button.innerText = "Toggle on/off";
        this.button.classList.add("switch");
    }

    connectedCallback(){
        this.append(this.bulb,this.button);
        this.button.addEventListener("click", ()=>{
            this.toggleLight()
        });
    }

    toggleLight(){
        this.bulb.style.backgroundColor === 'grey' ?
            this.bulb.style.backgroundColor = 'yellow' :
            this.bulb.style.backgroundColor = 'grey';
    }
}
customElements.define('light-switch', LightSwitch);