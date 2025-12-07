import { Logger } from "jsr:@deno-library/logger";
import { COLORS } from "../../helpers/colors.ts";

interface ILoggerAdapter {
  file: string;

  writeLog: (message: string) => void;
  writeError: (message: string) => void;
  writeWarning: (message: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  public file: string;
  private logger = new Logger();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(message: string): void {
    this.logger.info(`[${this.file} log]: ${message}`);
  }

  writeError(message: string): void {
    this.logger.error(`[${this.file} error]: %c${message}`, COLORS.red);
  }
  writeWarning(message: string): void {
    this.logger.warn(`[${this.file} warning]: %c${message}`, COLORS.yellow);
  }
}
