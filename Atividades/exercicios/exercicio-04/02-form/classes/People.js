export default class People {
    #name;
    #lastName;
    #age;

    constructor(name, lastName, age) {
        if(!name || !lastName || !age)
            throw new Error("Oooops, dados insuficientes!");

        this.#name = name;
        this.#lastName = lastName;
        this.#age = age;
    }

    toString() {
        return `${this.#name} ${this.#lastName}`;
    }

    toJSON() {
        return { name: this.#name, lastName: this.#lastName, age: this.#age }
    }
}

function getUserInfo() {
    const people = new People(
        window.prompt("Digite seu nome:"),
        window.prompt("Digite seu sobrenome:"),
        window.prompt("Digite sua idade")
    );

    document.getElementById("name").innerText = "Nome: " + people.toString();
    document.getElementById("age").innerText = "Idade: " + people.toJSON().age;
}