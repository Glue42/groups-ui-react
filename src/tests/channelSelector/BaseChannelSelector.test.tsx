import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BaseChannelSelector from "../../defaultComponents/channelSelector/BaseChannelSelector";


describe("BaseChannelSelector component should", () => {
    const mockProps = {
        outsideClass: "test-outside",
        contentClass: "test-content",
        showSelector: jest.fn(),
        selectedChannel: "mockChannel",
        selectedChannelColor: "rgb(255, 255, 255)",
    };

    it("render with default classes", () => {
        const { baseElement } = render(<BaseChannelSelector {...mockProps} />);

        const outsideElement = screen.getByTitle("mockChannel");
        expect(outsideElement).toHaveClass("test-outside");

        const contentElement = baseElement.getElementsByClassName("test-content")[0];
        expect(contentElement).toHaveClass("test-content");
    });

    it("apply dynamic styling based on `selectedChannelColor`", () => {
        render(<BaseChannelSelector {...mockProps} />);

        const outerElement = screen.getByTitle(mockProps.selectedChannel);

        expect(outerElement).toHaveStyle(`background: ${mockProps.selectedChannelColor}`);
    });

    it("call `showSelector` with the correct bounds on click", async () => {
        const user = userEvent.setup();
        const mockShowSelector = jest.fn();
        render(<BaseChannelSelector {...mockProps} showSelector={mockShowSelector} />);

        const outsideElement = screen.getByTitle("mockChannel");

        await user.click(outsideElement);

        expect(mockShowSelector).toHaveBeenCalled();
        expect(mockShowSelector).toHaveBeenCalledWith(expect.objectContaining({
            top: expect.any(Number),
            left: expect.any(Number),
            width: expect.any(Number),
            height: expect.any(Number),
        }));
    });

    it("prevent propagation on `mousedown` events", () => {
        const mockStopPropagation = jest.fn();

        render(<BaseChannelSelector {...mockProps} />);

        const outerElement = screen.getByTitle(mockProps.selectedChannel);

        const event = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
        Object.defineProperty(event, "stopPropagation", { value: mockStopPropagation });

        outerElement.dispatchEvent(event);

        expect(mockStopPropagation).toHaveBeenCalled();
    });

    it("call `showSelector` with correct bounds", async () => {
        const mockShowSelector = jest.fn();
        const user = userEvent.setup();

        render(<BaseChannelSelector {...mockProps} showSelector={mockShowSelector} />);

        const outerElement = screen.getByTitle(mockProps.selectedChannel);

        await user.click(outerElement);

        expect(mockShowSelector).toHaveBeenCalledWith(
            expect.objectContaining({
                left: expect.any(Number),
                top: expect.any(Number),
                width: expect.any(Number),
                height: expect.any(Number),
            })
        );
    });

});
