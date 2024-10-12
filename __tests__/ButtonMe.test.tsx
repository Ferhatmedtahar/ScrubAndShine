import { Button } from "@/components/ButtonMe";
import { render, screen } from "@testing-library/react";
// PATTERN  3AAA
describe("Button", () => {
  it("should render the children and classnames", () => {
    //ARRANGE
    render(
      <Button background="bg-slate-500" hoverBackground="bg-slate-600">
        testing
      </Button>
    );
    //ACT , THE ACTION
    const myElement = screen.getByText("testing");
    //ASSERTION
    expect(myElement).toBeInTheDocument();
    expect(myElement).toHaveClass("bg-slate-500 hover:bg-slate-600");
  });
  it("should render on the screen", () => {
    //ARRANGE
    render(
      <Button background="bg-slate-500" hoverBackground="bg-slate-600">
        testing
      </Button>
    );
    //ACT , THE ACTION
    const myElement = screen.getByText("testing");
    //ASSERTION
    const { width, height } = myElement.getBoundingClientRect();

    // ASSER
    expect(width).toBeGreaterThanOrEqual(0);
    expect(height).toBeGreaterThanOrEqual(0);
  });
});
