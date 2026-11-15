# Mi Billetera Digital — Angular (Caso 2)

Evaluación T1 · Soluciones Web · UPN

## Integrantes

| Nombre | Código |
|---|---|
| Bruno Andre Castro Barrientos | N00375795 |
| Joseth Valdez Lopez | N00374266 |

## Versiones

- Node.js 20+ / npm 10+
- Angular 20.3 (componentes standalone)
- Bootstrap 5.3.8

## Estructura

```
src/app/
├── app.ts / app.html                 Contenedor (navbar + <app-billetera>)
├── movimiento.ts                     Interfaz Movimiento { tipo, monto }
├── billetera/                        PADRE: dueño del saldo y del historial
└── nuevo-movimiento/                 HIJO: formulario y validaciones
```

- **Padre (`BilleteraComponent`)**: tiene el saldo inicial (S/ 250.00) y el historial. Muestra el saldo por interpolación, el historial con `@for` y “Aún no hay movimientos” con `@if`. Actualiza el estado cuando el hijo emite un movimiento, y agrega el más reciente al inicio de la lista.
- **Hijo (`NuevoMovimientoComponent`)**: recibe el saldo con `input()` y emite el movimiento válido con `output()`. Usa `@if` para los mensajes de error y `[disabled]` para bloquear el botón cuando el monto está vacío, no es numérico, es ≤ 0 o es un gasto mayor que el saldo.

## Ejecución

```bash
npm install
npm start          # equivale a: ng serve
```

Abrir http://localhost:4200

## Pruebas funcionales

| # | Acción | Resultado |
|---|---|---|
| 1 | Abrir la app | Saldo S/ 250.00, “Aún no hay movimientos” |
| 2 | Recarga de 100 | Saldo S/ 350.00, la recarga aparece en el historial |
| 3 | Gasto de 80 | Saldo S/ 270.00, el gasto aparece primero |
| 4 | Gasto de 500 | Mensaje “Saldo insuficiente…” y botón deshabilitado |
| 5 | Monto vacío o 0 | Botón deshabilitado |
