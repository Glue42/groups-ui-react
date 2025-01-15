import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StickyButton from "../../defaultComponents/buttons/StickyButton";

describe("StickyButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to sticky",
        visible: true,
        isPressed: true
    };

    it("render with a specific tooltip", () => {
        render(<StickyButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<StickyButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });

    it("have 'active' class if isPressed is true", () => {
        render(<StickyButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveClass("active");
    })

    it("not have 'active' class if isPressed is false", () => {
        render(<StickyButton {...{ ...mockProps, isPressed: false }} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).not.toHaveClass("active");
    })
});
