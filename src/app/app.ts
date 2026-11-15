import { Component } from '@angular/core';
import { BilleteraComponent } from './billetera/billetera.component';

/** Contenedor de la aplicación. */
@Component({
  selector: 'app-root',
  imports: [BilleteraComponent],
  templateUrl: './app.html',
})
export class App {}
