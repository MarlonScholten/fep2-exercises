class MyCounter extends HTMLElement {
    static formAssociated = true;

    static get observedAttributes() {
        return ["step"];
    }

    constructor() {
        super();
        this.internals_ = this.attachInternals();
        this._min = this.min;
        this.innerHTML = `
        <button type="button" id="decreaseBtn">-</button>
        <input value="0" type="number" min="${this._min}">
        <button type="button" id="increaseBtn">+</button>
    `;

        // add event listeners on both buttons
        this.querySelector('#increaseBtn').addEventListener('click', this.increase.bind(this));
        this.querySelector('#decreaseBtn').addEventListener('click', this.decrease.bind(this));

        // bewijs dat formdata met juiste value word meegestuurd
        const parentForm = this.parentNode;
        parentForm.addEventListener('submit', event =>{
            event.preventDefault();

            const formData = new FormData(parentForm);
            formData.append('counterValue',this.value);
            for(let entry of formData.entries()){
                console.log({
                    key : entry[0],
                    value : entry[1]
                })
            }
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "step") {
            this.step = newValue;
        }
        if (name === "min") {
            this.min = newValue;
        }
    }

    // Form controls usually expose a "value" property
    get value() {
        return this.querySelector('input').value;
    }

    set value(val) {
        this.querySelector('input').value = val;
    }

    get step() {
        return this.getAttribute('step');
    }

    set step(val) {
        this._step = val;
    }

    get min(){
        return this.getAttribute('min');
    }

    set min(val){
        this._min = val;
    }

    increase() {
        this.value = Number(this.value) + Number(this._step);
        this.querySelector('input').setAttribute('value', this.value);
    }

    decrease() {
        this.value = Number(this.value) - Number(this._step);
        this.querySelector('input').setAttribute('value', this.value);
    }
}

customElements.define('my-counter', MyCounter);
