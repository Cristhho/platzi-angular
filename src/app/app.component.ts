import { Component } from '@angular/core';

import { Product } from './prduct.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Christian';
  age = 29;
  image = 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200';
  btnDisabled = true;

  person = {
    name: 'Christian',
    age: 20,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png'
  }

  emojis = [ '😂' , '🐦', '🐳','🌮', '💚'];

  products: Product[] = [
    {
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg',
      category: 'all',
    },
    {
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
    {
      name: 'Casa para perro',
      price: 34,
      image: './assets/images/house.jpg'
    },
    {
      name: 'Gafas',
      price: 3434,
      image: './assets/images/glasses.jpg'
    }
  ]

  box = {
    width: 100,
    height: 100,
    background: 'red'
  };

  register = {
    name: '',
    email: '',
    password: ''
  }

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  onScroll(event: Event) {
    const el = event.target as HTMLElement;
    console.log(el.scrollTop);
  }

  changeName(event: Event) {
    const el = event.target as HTMLInputElement;
    this.person.name = el.value;
  }

  deleteEmoji(index: number) {
    this.emojis.splice(index, 1);
  }

  onRegister() {
    console.log(this.register);
  }
}
