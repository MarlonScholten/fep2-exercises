class LightSwitch extends HTMLElement{
    constructor() {
        super();
        this.bulb = document.createElement("div");
        this.bulb.classList.add("light-bulb");
        this.bulb.style.backgroundColor = 'grey';
        this.button = document.createElement("button");
        this.button.innerText = "Toggle on/off";
        this.button.classList.add("switch");
        this.on = false;
    }

    connectedCallback(){
        this.append(this.bulb,this.button);
        this.button.addEventListener("click", ()=>{
            this.toggleLight()
        });
    }

    toggleLight(){
        if(this.on){
            this.bulb.style.backgroundColor = 'grey';
            this.on = false;
            this.removeAttribute('on');
        } else{
            this.bulb.style.backgroundColor = 'yellow';
            this.on = true;
            this.setAttribute('on', '')
        }
    }
}
customElements.define('light-switch', LightSwitch);