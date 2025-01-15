import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CloneButton from "../../defaultComponents/buttons/CloneButton";

describe("CloneButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to clone",
        visible: true,
    };

    it("render with a specific tooltip", () => {
        render(<CloneButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<CloneButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });
});
