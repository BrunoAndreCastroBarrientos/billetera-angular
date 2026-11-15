import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NuevoMovimientoComponent } from '../nuevo-movimiento/nuevo-movimiento.component';
import { Movimiento } from '../movimiento';

/**
 * Componente padre: es el dueño del estado (saldo e historial).
 */
@Component({
  selector: 'app-billetera',
  imports: [NuevoMovimientoComponent, DecimalPipe],
  templateUrl: './billetera.component.html',
})
export class BilleteraComponent {
  saldo = 250;
  movimientos: Movimiento[] = [];

  /** Procesa la solicitud válida que envía el hijo. */
  procesarMovimiento(mov: Movimiento): void {
    if (mov.monto <= 0 || (mov.tipo === 'Gasto' && mov.monto > this.saldo)) {
      return; // control adicional: el padre nunca acepta un movimiento inválido
    }
    const nuevoSaldo = mov.tipo === 'Recarga' ? this.saldo + mov.monto : this.saldo - mov.monto;
    this.saldo = Math.round(nuevoSaldo * 100) / 100;
    this.movimientos = [mov, ...this.movimientos]; // el más reciente va primero
  }
}
