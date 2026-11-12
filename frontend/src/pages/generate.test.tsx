import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";

import Generate_Page from "./generate";

const SYNTHESIZE_URL = "http://localhost:8000/api/v1/synthesize";

let resolveRequest: () => void;

const server = setupServer(
  http.post(SYNTHESIZE_URL, async () => {
    await new Promise<void>((resolve) => {
      resolveRequest = resolve;
    });
    return HttpResponse.json({ ok: true });
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

const getGenerateButton = () =>
  screen.getByRole("button", { name: /generate audio/i }) as HTMLButtonElement;

describe("Generate button", () => {
  it("is enabled initially with no loading indicator", () => {
    render(<Generate_Page />);
    expect(getGenerateButton().disabled).toBe(false);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("disables and shows a loading icon while generating, then re-enables", async () => {
    render(<Generate_Page />);

    fireEvent.click(getGenerateButton());

    await waitFor(() => expect(getGenerateButton().disabled).toBe(true));
    expect(screen.getByRole("status")).toBeTruthy();

    resolveRequest();

    await waitFor(() => expect(getGenerateButton().disabled).toBe(false));
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("re-enables the button when the request fails", async () => {
    server.use(
      http.post(SYNTHESIZE_URL, async () => {
        await delay(10);
        return HttpResponse.error();
      }),
    );
    render(<Generate_Page />);

    fireEvent.click(getGenerateButton());

    await waitFor(() => expect(getGenerateButton().disabled).toBe(true));
    await waitFor(() => expect(getGenerateButton().disabled).toBe(false));
  });
});
