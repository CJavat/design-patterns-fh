/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

import { COLORS } from "../helpers/colors.ts";

interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
  getPrice(): number;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private price: number = 30;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Niño en Montaña Rusa: Precio con descuento de ${
        rollerCoaster.getPrice() * 0.5
      }`
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Niño en Casa Del Terror: Precio con descuento de ${
        hauntedHouse.getPrice() * 0.7
      }`
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Niño en la Rueda De La Fortuna: Precio con descuento de ${
        ferrisWheel.getPrice() * 0.6
      }`
    );
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Adulto en Montaña Rusa: Precio con descuento de ${rollerCoaster.getPrice()}`
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Adulto en Casa Del Terror: Precio con descuento de ${hauntedHouse.getPrice()}`
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Adulto en la Rueda De La Fortuna: Precio con descuento de ${ferrisWheel.getPrice()}`
    );
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Adulto Mayor en Montaña Rusa: Precio con descuento de ${
        rollerCoaster.getPrice() * 0.85
      }`
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Adulto Mayor en Casa Del Terror: Precio con descuento de ${
        hauntedHouse.getPrice() * 0.85
      }`
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Adulto Mayor en la Rueda De La Fortuna: Precio con descuento de ${
        ferrisWheel.getPrice() * 0.85
      }`
    );
  }
}

function main() {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  console.log(`Montaña rusa: ${new RollerCoaster().getPrice()}`);
  console.log(`casa del terror: ${new HauntedHouse().getPrice()}`);
  console.log(`Rueda de la fortuna: ${new FerrisWheel().getPrice()}`);
  console.log("\n\n");

  console.log("\n%cVisitante niño", COLORS.green);
  const childVisitor = new ChildVisitor();
  attractions.forEach((attraction) => attraction.accept(childVisitor));

  console.log("\n%cVisitante adulto", COLORS.purple);
  const adultVisitor = new AdultVisitor();
  attractions.forEach((attraction) => attraction.accept(adultVisitor));

  console.log("\n%cVisitante adulto mayor", COLORS.brown);
  const seniorVisitor = new SeniorVisitor();
  attractions.forEach((attraction) => attraction.accept(seniorVisitor));

  console.log("\n\n");
}

main();
