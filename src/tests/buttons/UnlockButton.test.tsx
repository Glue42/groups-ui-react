import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UnlockButton from "../../defaultComponents/buttons/UnlockButton";

describe("UnlockButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to unlock",
        visible: true,
    };

    it("render with a specific tooltip", () => {
        render(<UnlockButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<UnlockButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });
});
