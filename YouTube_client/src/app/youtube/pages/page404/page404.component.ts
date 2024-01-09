import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  })
export class Page404Component {
  constructor(private router: Router) { }

  back():void {
    this.router.navigate(['/']);
  }
}
