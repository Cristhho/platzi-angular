import { Component } from '@angular/core';

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
    avatar: 'https://www.w3schools.com/howto/img_avatar.png'
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
}
