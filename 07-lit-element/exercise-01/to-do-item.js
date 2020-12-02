import { LitElement, html, css } from 'lit-element';

class TodoItem extends LitElement {
	render(){
		return html`
		<li class="item">
			<input type="checkbox" @click="${this.toggleChecked}">
			<label>${this._text}</label>
		</li>
		`;
	}

	toggleChecked(){
		const toggleEvent = new CustomEvent('onToggle', { detail: this.index });
		this.dispatchEvent(toggleEvent);
	}

	static get styles() {
		return css`
		  :host {
				display: block;
				font-family: sans-serif;
			}
			.completed {
				text-decoration: line-through;
			}
			button {
				border: none;
				cursor: pointer;
			}
		`;
	}

	connectedCallback() {
		if(!this.hasAttribute('text')) {
			this.setAttribute('text', 'placeholder');
		}

		this._renderTodoItem();
	}

	static get observedAttributes() {
		return ['text', 'checked', 'index'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch(name){
			case 'text':
				this._text = newValue;
				break;
			case 'checked':
				this._checked = this.hasAttribute('checked');
				break;
			case 'index':
				this._index = parseInt(newValue);
				break;
		}
	}

	_renderTodoItem() {
		if (this.hasAttribute('checked')) {
			this._item.classList.add('completed');
			this._checkbox.setAttribute('checked', '');
		} else {
			this._item.classList.remove('completed');
			this._checkbox.removeAttribute('checked');
		}

		this._textLabel.innerHTML = this._text;
	}

	set index(val) {
		this.setAttribute('index', val);
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

	get _item(){
		return this.shadowRoot.querySelector('.item');
	}

	get _textLabel(){
		return this.shadowRoot.querySelector('label');
	}

	get _checkbox(){
		return this.shadowRoot.querySelector('input');
	}
}
window.customElements.define('to-do-item', TodoItem);