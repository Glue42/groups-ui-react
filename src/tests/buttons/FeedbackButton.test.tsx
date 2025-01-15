import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackButton from "../../defaultComponents/buttons/FeedbackButton";

describe("FeedbackButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to feedback",
        visible: true,
    };

    it("render with a specific tooltip", () => {
        render(<FeedbackButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<FeedbackButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });
});
