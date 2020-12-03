import { LitElement, html, css } from 'lit-element';
import './to-do-item.js';

class ToDoList extends LitElement {
	static get properties(){
		return{
			todos: {type: Array}
		}
	}

	render(){
		return html`
		<h1>To do</h1>
		<form id="todo-input">
			<input type="text" placeholder="Add a new to do">
			<button @click="${this._addTodo}">Voeg toe</button>
		</form>
		<ul id="todos">
			${this.todos.map((todo, index) => html`
				<to-do-item
					text='${todo.text}'
					index='${index}'
					?checked='${todo.checked}'
					@onToggle="${this._addTodo}">
				</to-do-item>
			`)}
		</ul>
		`;
	}

	static get styles(){
		// language=css
		return css`
		:host {
            display: block;
            font-family: sans-serif;
        }
    
        ul {
            list-style: none;
            padding: 0;
        }
    
        input {
            font-size: 1em;
            padding: 0.5em;
            border: 2px solid #323232;
            border-radius: 2px;
        }
    
        button {
            background-color: #104436;
            border: 2px solid #08221b;
            border-radius: 2px;
            color: white; 
            cursor: pointer;
            font-size: 1em;
            padding: 0.5em 1em;
        }
		`;
	}

	_addTodo(e) {
		e.preventDefault();
		if (this.input.value.length > 0) {
			this.todos.push({
				text: this.input.value,
				checked: false
			});
			this.todos = [...this.todos];
			this.input.value = '';
		}
	}

	get todoList(){
		return this.shadowRoot.querySelector('ul');
	}

	get input(){
		return this.shadowRoot.querySelector('input');
	}

	get submitButton(){
		return this.shadowRoot.querySelector('button');
	}
}
window.customElements.define('to-do-list', ToDoList);