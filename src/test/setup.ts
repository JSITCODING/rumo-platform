import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

function memoryStorage() {
  const storage = new Map<string, string>();
  return {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear()
  };
}

Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: memoryStorage()
});
Object.defineProperty(window, "sessionStorage", {
  configurable: true,
  value: memoryStorage()
});
Object.defineProperty(window, "scrollTo", {
  configurable: true,
  value: vi.fn()
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  window.sessionStorage.clear();
});
