abstract class InputObserverContract {
  abstract onInput(input: string): Promise<boolean>;
  abstract onExit(): void;
  abstract getPriority(): number;
}

export default InputObserverContract;
