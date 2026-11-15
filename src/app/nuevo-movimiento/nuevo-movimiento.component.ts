import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Movimiento, TipoMovimiento } from '../movimiento';

/**
 * Componente hijo: muestra el formulario, valida
 * y notifica al padre solo las solicitudes válidas.
 * No modifica el saldo ni el historial.
 */
@Component({
  selector: 'app-nuevo-movimiento',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './nuevo-movimiento.component.html',
})
export class NuevoMovimientoComponent {
  /** Saldo actual recibido del padre. */
  saldo = input.required<number>();

  /** Notifica al padre un movimiento válido. */
  movimiento = output<Movimiento>();

  tipo: TipoMovimiento = 'Recarga';
  monto: number | null = null;

  get montoInvalido(): boolean {
    return this.monto === null || this.monto === undefined || isNaN(this.monto) || this.monto <= 0;
  }

  get saldoInsuficiente(): boolean {
    return this.tipo === 'Gasto' && !this.montoInvalido && this.monto! > this.saldo();
  }

  get formularioInvalido(): boolean {
    return this.montoInvalido || this.saldoInsuficiente;
  }

  registrar(): void {
    if (this.formularioInvalido) {
      return;
    }
    this.movimiento.emit({ tipo: this.tipo, monto: Math.round(this.monto! * 100) / 100 });
    this.monto = null;
  }
}
