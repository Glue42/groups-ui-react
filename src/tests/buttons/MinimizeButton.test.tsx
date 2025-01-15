import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MinimizeButton from "../../defaultComponents/buttons/MinimizeButton";

describe("MinimizeButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to minimize",
        visible: true,
    };

    it("render with a specific tooltip", () => {
        render(<MinimizeButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<MinimizeButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });
});
