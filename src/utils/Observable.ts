type Disconnecter = { disconnect: () => void };

export default class Observable<T> {
  private listeners = new Set<(value: T) => void>();
  constructor(protected value: T) {}

  protected _update(value: T) {
    this.value = value;
    this.emit();
  }

  protected emit() {
    for (const listener of this.listeners) {
      listener(this.snapshot());
    }
  }

  update(value: T) {
    this._update(value);
  }

  snapshot(): T {
    return this.value;
  }

  subscribe(callback: (value: T) => void): Disconnecter {
    this.listeners.add(callback);
    return {
      disconnect: () => {
        this.listeners.delete(callback);
      },
    };
  }
}
