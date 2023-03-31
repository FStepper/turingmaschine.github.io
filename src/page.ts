class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): string {
    return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

const john = new Person('John', 30);
const outputElement = document.getElementById('output');
if (outputElement) {
  outputElement.innerHTML = john.introduce();
}

alert("test alert")