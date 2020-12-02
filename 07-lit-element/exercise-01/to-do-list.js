import { LitElement, html, css } from 'lit-element';
import './to-do-item.js';

class ToDoList extends LitElement {
	render(){
		return html`
		<h1>To do</h1>
		<form id="todo-input">
			<input type="text" placeholder="Add a new to do">
			<button @click="${this._addTodo}">Voeg toe</button>
		</form>
		<ul id="todos"></ul>
		`;
	}

	static get styles(){
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

	_toggleTodo(e) {
		const todo = this._todos[e.detail];
		this._todos[e.detail] = Object.assign({}, todo, {
			checked: !todo.checked
		});
		this._renderTodoList();
	}

	_addTodo(e) {
		console.log('you clicked the button')
		e.preventDefault();
		if (this._input.value.length > 0) {
			this._todos.push({
				text: this._input.value,
				checked: false
			});
			this._renderTodoList();
			this._input.value = '';
		}
	}

	// TODO geeft undefined wanneer je document.createElement('to-do-item') probeert te maken
	_renderTodoList() {
		this._todoList.innerHTML = '';

		console.log(this._todos)
		this._todos.forEach((todo, index) => {
			// let todoItem = document.createElement('to-do-item');
			// $todoItem.setAttribute('text', todo.text);
			//
			// if (todo.checked) {
			// 	$todoItem.setAttribute('checked', '');
			// }
			//
			// $todoItem.setAttribute('index', index);
			// $todoItem.addEventListener('onToggle', this._toggleTodo.bind(this));
			// this._todoList.appendChild($todoItem);
		});
	}

	set todos(value) {
		this._todos = value;
		this._renderTodoList();
	}

	get todos() {
		return this._todos;
	}

	get _todoList(){
		return this.shadowRoot.querySelector('ul');
	}

	get _input(){
		return this.shadowRoot.querySelector('input');
	}

	get _submitButton(){
		return this.shadowRoot.querySelector('button');
	}
}

window.customElements.define('to-do-list', ToDoList);