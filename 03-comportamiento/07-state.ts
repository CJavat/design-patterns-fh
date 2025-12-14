import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";
/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingForMoney(this);
  }

  setState(newState: State): void {
    this.state = newState;
    console.log(`Estado cambiado a: %c${newState.name}`, COLORS.yellow);
  }

  insertMoney(): void {
    this.state.insertMoney();
  }

  selectProduct(): void {
    this.state.selectProduct();
  }

  dispenseProduct(): void {
    this.state.dispenseProduct();
  }

  getStateName(): string {
    return this.state.name;
  }
}

// Estados
class WaitingForMoney implements State {
  name: string = "Esperando Dinero";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      "Dinero Insertado: %cahora puedes seleccionar un producto",
      COLORS.green
    );

    this.vendingMachine.setState(new SelectingProduct(this.vendingMachine));
  }

  selectProduct(): void {
    console.log("%cPrimero debes seleccionar el dinero.", COLORS.red);
  }

  dispenseProduct(): void {
    console.log("%cPrimero debes seleccionar el dinero.", COLORS.red);
  }
}

class SelectingProduct implements State {
  name: string = "Selecionando Producto";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      "%cPor favor selecciona un producto - Dinero ya insertado",
      COLORS.red
    );
  }

  selectProduct(): void {
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }

  dispenseProduct(): void {
    console.log(
      "%cPor favor selecciona un producto - Antes de despacharlo",
      COLORS.red
    );
  }
}

class DispensingProduct implements State {
  name: string = "Despachando Producto";
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("Por favor espera a que se entregue el producto.", COLORS.red);
  }

  selectProduct(): void {
    console.log("%cProducto ya seleccionado y despachando...", COLORS.red);
  }

  dispenseProduct(): void {
    console.log(
      "%cProducto despachado. Cambiando estado a EsperandoDinero.",
      COLORS.green
    );

    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = "4";

  do {
    console.clear();
    console.log(
      `Estado actual: %c${vendingMachine.getStateName()}`,
      COLORS.blue
    );

    selectedOption = prompt(`
      1. Insertar Dinero
      2. Seleccionar Producto
      3. Despachar Producto
      4. Salir

      Selecciona una opción: 
    `);

    switch (selectedOption) {
      case "1":
        vendingMachine.insertMoney();
        break;

      case "2":
        vendingMachine.selectProduct();
        break;

      case "3":
        vendingMachine.dispenseProduct();
        break;

      case "4":
        console.log("%cSaliendo del simulador...", COLORS.violet);
        break;

      default:
        console.log("Opción no válida.");
        break;
    }

    await sleep(3000);
  } while (selectedOption !== "4");
}

main();
