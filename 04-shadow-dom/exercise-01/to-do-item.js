const template = document.createElement('template')
template.innerHTML = `
    <li class="item">
        <input type="checkbox">
        <label></label>
    </li>`

class TodoItem extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode:'open'});
	}

	static get observedAttributes(){
		return ["text"];
	}

	attributeChangedCallback(name, oldValue, newValue){
		this._text = newValue;
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = `
		<style>
			:host {
			display: block;
			font-family: sans-serif;
		  	}
		  	
		  	:host .completed {
				text-decoration: line-through;
		  	}
		</style>`;

		this.appendChild(template.content.cloneNode(true))
		this._renderTodoItem();
		const onToggle = new CustomEvent('onToggle',{
			bubbles: true,
			detail: this.getAttribute('index')
		});
		this.shadowRoot.querySelector('.item').querySelector('input').addEventListener('click', () => this.dispatchEvent(onToggle));
	}

	_renderTodoItem() {
		if (this.hasAttribute('checked')) {
			this.shadowRoot.querySelector('.item').classList.add('completed');
			this.shadowRoot.querySelector('.item').querySelector('input').setAttribute('checked', '');
		} else {
			this.shadowRoot.querySelector('.item').classList.remove('completed');
			this.shadowRoot.querySelector('.item').querySelector('input').removeAttribute('checked');
		}
		this.shadowRoot.querySelector('label').innerHTML = this._text;
	}

	set index(value) {
		this._index = value;
	}

	get index() {
		return this._index;
	}

	get checked() {
		return this.hasAttribute('checked');
	}

	set checked(val) {
		if (val) {
			this.setAttribute('checked', '');
		} else {
			this.removeAttribute('checked');
		}
	}
}
window.customElements.define('to-do-item', TodoItem);