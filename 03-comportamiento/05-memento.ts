import { COLORS } from "../helpers/colors.ts";
/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
  private level: number = 1;
  private health: number = 1000;
  private position: string = "Inicio";

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }

  getLevel() {
    return this.level;
  }

  getHealth() {
    return this.health;
  }

  getPosition() {
    return this.position;
  }
}

class Game {
  private level: number = 1;
  private health: number = 1000;
  private position: string = "Inicio";

  constructor() {
    console.log(`
      Jugando en el nivel ${this.level}
      Salud: ${this.health}
      Posición: ${this.position}
    `);
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(
      `
      Jugando en el nivel ${this.level}
      Salud: ${this.health}
      Posición: ${this.position}
      `
    );
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(
      `
      \n%cProgreso Restaurado.
      %cRestauración en el nivel %c${this.level}
      %cSalud: %c${this.health}
      %cPosición: %c${this.position}
      `,
      COLORS.yellow,
      COLORS.blue,
      COLORS.pink,
      COLORS.blue,
      COLORS.pink,
      COLORS.blue,
      COLORS.pink
    );
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento): void {
    this.mementos.push(memento);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

function main() {
  const game = new Game();
  const history = new GameHistory();

  history.push(game.save());

  // Jugador avanza en el juego
  game.play(2, 90, "Bosque Encantado");
  history.push(game.save());

  game.play(3, 70, "Cueva Oscura");
  history.push(game.save());

  game.play(4, 60, "Castillo Del Dragón");
  console.log("\n%cEstado actual", COLORS.green);

  game.restore(history.pop()!);
  console.log(
    `
    %c\nDespués de restaurar el último estado guardado.
  `,
    COLORS.green
  );

  console.log("\n\n");
}

main();
