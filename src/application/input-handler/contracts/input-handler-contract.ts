export default abstract class InputHandlerContract {
  abstract initialize(): void;
  abstract prompt(): void;
  abstract close(): void;
}
