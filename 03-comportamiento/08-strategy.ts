import { COLORS } from "../helpers/colors.ts";
/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

// Estrategía #1
class SwimFast implements MovementStrategy {
  move(): void {
    console.log("%cEl pato está nadando rápido.", COLORS.blue);
  }
}

// Estrategia #2
class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log("%cEl pato está volando sobre el agua.", COLORS.pink);
  }
}

// Estrategia #3
class WalkClumsily implements MovementStrategy {
  move(): void {
    console.log("%cEl pato está caminando.", COLORS.green);
  }
}

// Consumidor de estrategia
class Duck {
  private name: string;
  private movementStrategy: MovementStrategy;

  constructor(name: string, movementStrategy: MovementStrategy) {
    this.name = name;
    this.movementStrategy = movementStrategy;

    console.log(`%c${name} %clisto para correr`, COLORS.green, COLORS.yellow);
  }

  setMovementStrategy(movementStrategy: MovementStrategy): void {
    this.movementStrategy = movementStrategy;
    console.log(`%c${this.name} cambión de estrategía.`, COLORS.brown);
  }

  performMovement(): void {
    console.log(`\n%c${this.name} se prepara para moverse...`, COLORS.cyan);
    this.movementStrategy.move();
  }
}

function main() {
  const duck1 = new Duck("Pato 1", new SwimFast());
  const duck2 = new Duck("Pato 2", new FlyOverWater());
  const duck3 = new Duck("Pato 2", new WalkClumsily());

  console.log("\n%cComienza la carrera de patos", COLORS.red);

  duck1.performMovement();
  duck2.performMovement();
  duck3.performMovement();

  duck3.setMovementStrategy(new FlyOverWater());
  duck3.performMovement();
}

main();
