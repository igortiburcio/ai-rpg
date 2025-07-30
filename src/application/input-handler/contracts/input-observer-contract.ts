abstract class InputObserverContract {
  abstract onInput(input: string): boolean;
  abstract onExit(): void;
  abstract getPriority(): number;
}

export default InputObserverContract;
