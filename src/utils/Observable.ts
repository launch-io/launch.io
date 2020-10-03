type Disconnecter = { disconnect: () => void };
export class Observable<T> {
  private listeners = new Set<(value: T) => void>();
  constructor(protected value: T) {}

  protected _update(value: T) {
    this.value = value;
    this.emit();
  }
  update(value: T) {
    this._update(value);
  }
  protected emit() {
    for (const listener of this.listeners) {
      listener(this.snapshot());
    }
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
