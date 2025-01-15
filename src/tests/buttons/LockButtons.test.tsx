import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LockButtons from "../../defaultComponents/buttons/LockButtons";

describe("LockButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to lock",
        visible: true,
    };

    it("render with a specific tooltip", () => {
        render(<LockButtons {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<LockButtons {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });
});
