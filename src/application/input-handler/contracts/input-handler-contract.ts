import InputObserverContract from './input-observer-contract';

export default abstract class InputHandlerContract {
  abstract initialize(): void;
  abstract prompt(): void;
  abstract close(): void;
  abstract subscribe(observer: InputObserverContract): void;
  abstract unsubscribe(observer: InputObserverContract): void;
  abstract showMessage(message: string): void;
}
