import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from "../../defaultComponents/buttons/CustomButton";

describe("CustomButton component should", () => {
    const mockProps = {
        onClick: jest.fn(),
        tooltip: "Click to custom",
        visible: true,
        imageData: 'mockUrl',
        buttonId: 'button123'
    };

    it("render with a specific tooltip", () => {
        render(<CustomButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        expect(outerElement).toHaveAttribute("title", mockProps.tooltip);
    });

    it("trigger the onClick handler when clicked", () => {
        render(<CustomButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        fireEvent.click(outerElement);

        expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    });

    it("have background image with url 'mockUrl'", () => {
        const { baseElement } = render(<CustomButton {...mockProps} />);

        const innerElement = baseElement.getElementsByClassName("t42-custom-button")[0];

        expect(innerElement).toHaveStyle(`background-image: url("${mockProps.imageData}")`,);
    });
});
