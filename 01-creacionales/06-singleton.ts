/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log("%cLas pelotas del Dragón han sido creadas!", COLORS.green);
    }

    return DragonBalls.instance;
  }

  collectBall(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(
        `%cHas recogido una bola del dragón! Total: ${this.ballsCollected}`,
        COLORS.cyan
      );

      return;
    } else {
      console.log(`%c¡Ya tienes las 7 bolas del dragón!`, COLORS.yellow);
    }
  }

  summonShenlong(): void {
    if (this.ballsCollected === 7) {
      console.log(`%c¡Has invocado a Shenlong!`, COLORS.black);
      this.ballsCollected = 0;

      return;
    }

    console.log(
      `%c\nAún te faltan ${7 - this.ballsCollected} bolas del dragón.`,
      COLORS.red
    );
  }
}

function main() {
  const goku = DragonBalls.getInstance();
  goku.collectBall();
  goku.collectBall();
  goku.collectBall();

  goku.summonShenlong();

  const vegeta = DragonBalls.getInstance();
  vegeta.collectBall();
  vegeta.collectBall();
  vegeta.collectBall();
  vegeta.collectBall();

  goku.summonShenlong();

  vegeta.summonShenlong();
}

main();
