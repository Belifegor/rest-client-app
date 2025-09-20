import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Error from "./error";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "Something went wrong!",
      button: "Try again",
    };
    return translations[key] || key;
  },
}));

const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

describe("Error Component", () => {
  const mockReset = vi.fn();
  const defaultProps = {
    error: {
      message: "Test error message",
      digest: undefined,
    } as Error & { digest?: string },
    reset: mockReset,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with error message", () => {
    render(<Error {...defaultProps} />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });

  it("logs error to console", () => {
    render(<Error {...defaultProps} />);
    expect(consoleErrorMock).toHaveBeenCalledWith(defaultProps.error);
  });

  it("calls reset on button click", () => {
    render(<Error {...defaultProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("handles error with digest property", () => {
    const errorWithDigest = {
      ...defaultProps.error,
      digest: "test-digest-123",
    };

    render(<Error {...defaultProps} error={errorWithDigest} />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.objectContaining({
        digest: "test-digest-123",
      })
    );
  });

  it("applies correct styling classes", () => {
    render(<Error {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gradient-to-r");
    expect(button).toHaveClass("from-teal-600");
    expect(button).toHaveClass("to-green-600/80");

    const container = screen.getByText("Something went wrong!").parentElement;
    expect(container).toHaveClass("flex", "flex-col", "justify-center", "items-center");
  });
});
