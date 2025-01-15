import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OverflowButton from "../../defaultComponents/buttons/OverflowButton";

describe("OverflowButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to overflow",
        visible: true,
    };

    it("render with a specific tooltip", () => {
        render(<OverflowButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<OverflowButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });
});
