import { COLORS } from "../helpers/colors.ts";
/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

class Projector {
  turnOn(): void {
    console.log("Proyector encendido.");
  }

  turnOff(): void {
    console.log("Proyector apagado.");
  }
}

class SoundSystem {
  on(): void {
    console.log("Sistema de sonido encendido.");
  }

  off(): void {
    console.log("Sistema de sonido apagado.");
  }
}

class VideoPlayer {
  on(): void {
    console.log("Reproductor de video encendido.");
  }

  play(movie: string): void {
    console.log(`Reproduciendo película: %c${movie}`, COLORS.blue);
  }

  stop(): void {
    console.log("Reproducción detenida.");
  }

  off(): void {
    console.log("Reproductor de video apagado.");
  }
}

class PopcornMaker {
  poppingPopcorn(): void {
    console.log("Haciendo palomitas de maíz.");
  }

  turnOffPoppingPopcorn(): void {
    console.log("Palomitas de maíz apagado.");
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }

  watchMovie(movie: string): void {
    console.log("\n%cPreparando para ver una película...", COLORS.cyan);
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log("\n%cDisfrute la película", COLORS.green);
  }

  endWatchMovie(): void {
    console.log("\n\n\n%cApagando el cine en casa...", COLORS.cyan);
    this.videoPlayer.stop();
    this.videoPlayer.off();
    this.popcornMaker.turnOffPoppingPopcorn();
    this.soundSystem.off();
    this.projector.turnOff();
  }
}

function main() {
  const homeTheater = new HomeTheaterFacade({
    projector: new Projector(),
    soundSystem: new SoundSystem(),
    videoPlayer: new VideoPlayer(),
    popcornMaker: new PopcornMaker(),
  });

  homeTheater.watchMovie("Inception");
  homeTheater.endWatchMovie();
}

main();
