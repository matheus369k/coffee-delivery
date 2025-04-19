import { cleanup } from "@testing-library/react";
import { afterEach } from "@jest/globals";
import "@testing-library/jest-dom";

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});
