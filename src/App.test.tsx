import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the app with Wirth_It Music branding", () => {
    render(<App />);
    const headings = screen.getAllByText(/wirth_?it music/i);
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]).toBeInTheDocument();
  });
});
