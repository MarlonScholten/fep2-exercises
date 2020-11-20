import './to-do-item.js';

class ToDoList extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode:'open'});
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = `
		<style>
			:host {
				display: block;
				font-family: sans-serif;
		  	}

			:host ul {
				list-style: none;
				padding: 0;
			}
			
			:host input {
				font-size: 1em;
				padding: 0.5em;
				border: 2px solid #323232;
				border-radius: 2px;
			}
			
			:host button {
				background-color: #104436;
				border: 2px solid #08221b;
				border-radius: 2px;
				color: white; 
				cursor: pointer;
				font-size: 1em;
				padding: 0.5em 1em;
			}
		</style>
		<h1>To do</h1>
        <input type="text" placeholder="Add a new to do">
        <button>Voeg toe</button>
        <ul id="todos"></ul>`;

		this.shadowRoot.querySelector('button').addEventListener('click', this._addTodo.bind(this));
	}

	_addTodo() {
		if(this.shadowRoot.querySelector('input').value.length > 0){
			this._todos.push({
				text: this.shadowRoot.querySelector('input').value,
				checked: false
			})
			this._renderTodoList();
			this.shadowRoot.querySelector('input').value = '';
		}
	}

	_toggleTodo(event) {
		let target = this.shadowRoot.querySelector('#todos').children.item(event.detail);
		if(target.hasAttribute('checked')){
			target.removeAttribute('checked');
			target.querySelector('.item').classList.remove('completed');
		} else{
			target.setAttribute('checked', '');
			target.querySelector('.item').classList.add('completed');
		}
	}

	_renderTodoList() {
		this.shadowRoot.querySelector('#todos').innerHTML = '';

		this._todos.forEach((todo, index) => {
			let $todoItem = document.createElement('to-do-item');
			$todoItem.setAttribute('text', todo.text);
			// if the to do is checked, set the attribute, else; omit it.
			if (todo.checked) {
				$todoItem.setAttribute('checked', '');
			}
			// By setting index we have some state to keep track of the index
			// of the to do
			$todoItem.setAttribute('index', index);
			$todoItem.addEventListener("onToggle", event => this._toggleTodo(event));
			this.shadowRoot.querySelector('#todos').appendChild($todoItem);
		});
	}

	set todos(value) {
		this._todos = value;
		this._renderTodoList();
	}

	get todos() {
		return this._todos;
	}
}

window.customElements.define('to-do-list', ToDoList);