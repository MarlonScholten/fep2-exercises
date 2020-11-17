const template = document.createElement('template');
template.innerHTML = `
    <h1>To do</h1>
    <ul id="todos"></ul>
`;

class TodoList extends HTMLElement {
	constructor() {
		super();
		this._todos = [];
	}

	connectedCallback() {
		this.appendChild(template.content.cloneNode(true));
	}

	get todos(){
		return this._todos;
	}

	set todos(value){
		this._todos = value;
		this._renderListItems();
	}

	_renderListItems(){
		let ul = this.querySelector("#todos");

		// clear the list
		while(ul.hasChildNodes()){
			ul.lastChild.remove();
		}

		// add all the items
		this._todos.forEach((todo, index) =>{
			let li = document.createElement("li");
			li.innerText = todo.text;
			ul.appendChild(li);
		});
	}
}
customElements.define('to-do-list', TodoList);