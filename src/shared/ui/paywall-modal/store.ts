let listeners: Array<() => void> = [];

export function openPaywallModal() {
  listeners.forEach((cb) => cb());
}

export function subscribePaywallModal(cb: () => void) {
  listeners.push(cb);

  return () => {
    listeners = listeners.filter((listener) => listener !== cb);
  };
}
