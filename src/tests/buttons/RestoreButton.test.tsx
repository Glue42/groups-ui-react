import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RestoreButton from "../../defaultComponents/buttons/RestoreButton";

describe("RestoreButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to restore",
        visible: true,
    };

    it("render with a specific tooltip", () => {
        render(<RestoreButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<RestoreButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });
});
