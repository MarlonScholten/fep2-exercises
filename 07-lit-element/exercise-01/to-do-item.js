import { LitElement, html, css } from 'lit-element';

class TodoItem extends LitElement {
	static get properties(){
		return {
			text: {type: String},
			checked: {type: Boolean}
		}
	}

	render(){
		return html`
		<li class="item">
			${this.checked ? 
			html`<input type="checkbox" @click="${this.toggleChecked}" checked>` : 
			html`<input type="checkbox" @click="${this.toggleChecked}">`}
			<label>${this.text}</label>
		</li>
		`;
	}

	toggleChecked(){
		const toggleEvent = new CustomEvent('onToggle', { detail: this.index });
		this.dispatchEvent(toggleEvent);
	}

	static get styles() {
		// language=css
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

	get item(){
		return this.shadowRoot.querySelector('.item');
	}

	get textLabel(){
		return this.shadowRoot.querySelector('label');
	}

	get checkbox(){
		return this.shadowRoot.querySelector('input');
	}
}
window.customElements.define('to-do-item', TodoItem);