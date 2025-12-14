import { COLORS } from "../helpers/colors.ts";
/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`\nNuevo suscriptor al canal %c${this.name}`, COLORS.green);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(`\nSuscriptor eliminado del canal %c${this.name}`, COLORS.red);
  }

  uploadVideo(videoTitle: string): void {
    console.log(
      `\nCanal ${this.name} ha subido un nuevo vídeo %c${videoTitle}`,
      COLORS.green
    );

    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(
      `\n${this.name} ha sido notificado: %cNuevo vídeo ${videoTitle}`,
      COLORS.yellow
    );
  }
}

function main() {
  const channel = new YouTubeChannel("Cocinando con CJavatX");

  const melissa = new Subscriber("Melissa");
  const cesar = new Subscriber("Cesar");
  const emin = new Subscriber("Emin");

  channel.subscribe(melissa);
  channel.subscribe(cesar);

  channel.uploadVideo("Receta de tamales oaxaqueños.");

  channel.subscribe(emin);
}

main();
