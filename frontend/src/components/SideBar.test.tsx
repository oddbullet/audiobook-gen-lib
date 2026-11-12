import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import SideBar from "./SideBar";

afterEach(cleanup);

const renderSideBar = () =>
  render(
    <SideBar
      chapters={["Chapter 1", "Chapter 2"]}
      onAddChapter={vi.fn()}
      onSelectChapter={vi.fn()}
    />,
  );

describe("SideBar chapter highlighting", () => {
  it("has no highlighted chapter initially", () => {
    renderSideBar();
    expect(screen.getByText("Chapter 1").getAttribute("aria-current")).toBeNull();
    expect(screen.getByText("Chapter 2").getAttribute("aria-current")).toBeNull();
  });

  it("highlights only the clicked chapter", () => {
    renderSideBar();

    fireEvent.click(screen.getByText("Chapter 1"));
    expect(screen.getByText("Chapter 1").getAttribute("aria-current")).toBe("true");
    expect(screen.getByText("Chapter 2").getAttribute("aria-current")).toBeNull();

    fireEvent.click(screen.getByText("Chapter 2"));
    expect(screen.getByText("Chapter 1").getAttribute("aria-current")).toBeNull();
    expect(screen.getByText("Chapter 2").getAttribute("aria-current")).toBe("true");
  });

  it("still notifies the parent of the selected chapter", () => {
    const onSelectChapter = vi.fn();
    render(
      <SideBar
        chapters={["Chapter 1"]}
        onAddChapter={vi.fn()}
        onSelectChapter={onSelectChapter}
      />,
    );
    fireEvent.click(screen.getByText("Chapter 1"));
    expect(onSelectChapter).toHaveBeenCalledWith("Chapter 1");
  });
});
