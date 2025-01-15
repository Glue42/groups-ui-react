import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MaximizeButton from "../../defaultComponents/buttons/MaximizeButton";

describe("MaximizeButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to maximize",
        visible: true,
    };

    it("render with a specific tooltip", () => {
        render(<MaximizeButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<MaximizeButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });
});