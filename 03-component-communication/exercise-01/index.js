class LightSwitch extends HTMLElement{
    constructor() {
        super();
        this.bulb = this.children[0];
        this.button = this.children[1];
        this.bulb.style.backgroundColor = 'grey';
        this.on = false;

        this.button.addEventListener("click", ()=>{
            this.toggleLight()
        });
    }

    toggleLight(){
        this.on ?
            this.bulb.style.backgroundColor = 'grey' :
            this.bulb.style.backgroundColor = 'yellow';
    }

    get on(){
        return this.getAttribute('on');
    }

    set on(bool){
        if (bool) {
            this.setAttribute('on', 'true');
        } else {
            this.setAttribute('on', 'false');
        }
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    customElements.define('light-switch', LightSwitch);
});