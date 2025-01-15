import React from "react";
import { render, screen } from "@testing-library/react";
import BaseButton from "../../defaultComponents/buttons/BaseButton";

describe("BaseButton component should", () => {
    const mockProps = {
        outerElement: {
            id: "outer-id",
            className: "outer-class",
            "data-testid": "outer-element",
        },
        innerElement: {
            id: "inner-id",
            className: "inner-class",
            "data-testid": "inner-element",
        },
    };

    it("render with the correct structure", () => {
        render(<BaseButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        const innerElement = screen.getByTestId("inner-element");

        // Ensure the outer <li> and inner <div> are present
        expect(outerElement).toBeInTheDocument();
        expect(innerElement).toBeInTheDocument();

        // Check that the inner <div> is nested inside the outer <li>
        expect(outerElement).toContainElement(innerElement);
    });

    it("apply props to the outer and inner elements", () => {
        render(<BaseButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");
        const innerElement = screen.getByTestId("inner-element");

        // Check props on the outer <li>
        expect(outerElement).toHaveAttribute("id", "outer-id");
        expect(outerElement).toHaveClass("outer-class");

        // Check props on the inner <div>
        expect(innerElement).toHaveAttribute("id", "inner-id");
        expect(innerElement).toHaveClass("inner-class");
    });

    it("include custom classes like `webGroupsManager.skipFocusStyle`", () => {
        render(<BaseButton {...mockProps} />);

        const outerElement = screen.getByTestId("outer-element");

        // Check for the custom class from webGroupsManager
        expect(outerElement).toHaveClass("t42-skip-focus");
    });

    it("support dynamic classes for outer and inner elements", () => {
        const dynamicProps = {
            outerElement:  { ...mockProps.outerElement, className: "dynamic-outer-class" },
            innerElement: { ...mockProps.innerElement, className: "dynamic-inner-class" },
        };

        render(<BaseButton {...dynamicProps} />);

        const outerElement = screen.getByTestId("outer-element");
        const innerElement = screen.getByTestId("inner-element");

        expect(outerElement).toHaveClass("dynamic-outer-class");
        expect(innerElement).toHaveClass("dynamic-inner-class");
    });

});
