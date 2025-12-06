/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  copyWith({
    content,
    cursorPosition,
    unsavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges
    );
  }

  displayState(): void {
    console.log("\n%cEstado del editor: ", COLORS.green);
    console.log(`
    Contenido: ${this.content} 
    Cursor Pos: ${this.cursorPosition} 
    Unsaved Changes: ${this.unsavedChanges} 
  `);
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex <= 0) return null;

    this.currentIndex--;
    return this.history[this.currentIndex];
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("console.log('hola mundo')", 2, false);

  history.save(editorState);
  console.log("%cEstado inicial", COLORS.blue);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "console.log('hola mundo!!!') \nconsole.log('nueva linea');",
    cursorPosition: 3,
    unsavedChanges: true,
  });

  history.save(editorState);
  console.log("%cDespués de editar el contenido", COLORS.red);
  editorState.displayState();

  console.log("%cDespués de mover el cursor", COLORS.red);
  editorState = editorState.copyWith({ cursorPosition: 5 });
  history.save(editorState);
  editorState.displayState();

  console.log("%cDespués del undo", COLORS.red);
  editorState = history.undo()!;
  editorState.displayState();

  console.log("%cDespués del undo 2", COLORS.red);
  editorState = history.undo()!;
  editorState.displayState();

  console.log("%cDespués del redo", COLORS.red);
  editorState = history.redo()!;
  editorState.displayState();
}

main();
