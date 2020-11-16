const template = document.createElement('template');
template.innerHTML = `
    <h1>To do</h1>
    <ul id="todos"></ul>
`;

class TodoList extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.appendChild(template.content.cloneNode(true));
		let ul = this.querySelector("#todos");
		console.log(this.todos);
		for(let i=0; i<list.length;i++){
			let li = document.createElement("li");
			li.innerText = list[i].text;
			ul.appendChild(li);
		}
	}

}
window.customElements.define('to-do-list', TodoList);