export type TipoMovimiento = 'Recarga' | 'Gasto';

/** Solicitud de movimiento que el hijo envía al padre. */
export interface Movimiento {
  tipo: TipoMovimiento;
  monto: number;
}
