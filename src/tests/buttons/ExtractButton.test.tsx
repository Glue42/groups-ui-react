import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExtractButton from "../../defaultComponents/buttons/ExtractButton";

describe("ExtractButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to extract",
        visible: true,
    };

    it("render with a specific tooltip", () => {
        render(<ExtractButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<ExtractButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });
});
