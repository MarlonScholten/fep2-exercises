class LightSwitch extends HTMLElement{

    constructor() {
        super();

        let items = this.children;
        console.log(items)
        console.log(items.item(1));
        // let button
    }

    toggleLight(){

    }
}
window.customElements.define('light-switch', LightSwitch);