class LightSwitch extends HTMLElement{
    constructor() {
        super();
        this.bulb = this.children[0];
        this.button = this.children[1];
        this.bulb.style.backgroundColor = 'grey';
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
window.addEventListener('DOMContentLoaded', (event) => {
    customElements.define('light-switch', LightSwitch);
});