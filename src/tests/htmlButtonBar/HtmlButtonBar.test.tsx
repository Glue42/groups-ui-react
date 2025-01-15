import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HtmlButtons from "../../defaultComponents/htmlButtonsBar/buttons";

const mockProps = {
    frameId: "mockFrameId",
    selectedWindow: "mockSelectedWindow",

    overflow: {
        onClick: jest.fn(),
        tooltip: "Overflow",
        visible: false,
    },
    feedback: {
        onClick: jest.fn(),
        tooltip: "Feedback",
        visible: true,
    },
    clone: {
        onClick: jest.fn(),
        tooltip: "Clone",
        visible: true,
    },
    sticky: {
        onClick: jest.fn(),
        tooltip: "Sticky",
        visible: true,
        isPressed: false,
    },
    extract: {
        onClick: jest.fn(),
        tooltip: "Extract",
        visible: true,
    },
    lock: {
        onClick: jest.fn(),
        tooltip: "Lock",
        visible: true,
    },
    unlock: {
        onClick: jest.fn(),
        tooltip: "Unlock",
        visible: true,
    },
    minimize: {
        onClick: jest.fn(),
        tooltip: "Minimize",
        visible: true,
    },
    maximize: {
        onClick: jest.fn(),
        tooltip: "Maximize",
        visible: true,
    },
    restore: {
        onClick: jest.fn(),
        tooltip: "Restore",
        visible: true,
    },
    close: {
        onClick: jest.fn(),
        tooltip: "Close",
        visible: true,
    },

    customButtons: [
        {
            buttonId: "custom-1",
            tooltip: "Custom Button 1",
            imageData: "data:image/png;base64,icon1",
            onClick: jest.fn(),
            visible: true
        },
        {
            buttonId: "custom-2",
            tooltip: "Custom Button 2",
            imageData: "data:image/png;base64,icon2",
            onClick: jest.fn(),
            visible: true
        },
    ],
};

describe("HtmlButtonsBar component should", () => {
    it("render all default buttons", () => {
        render(<HtmlButtons {...mockProps} />);
    
        const minimizeButton = screen.getByTitle("Minimize");
        const maximizeButton = screen.getByTitle("Maximize");
        const closeButton = screen.getByTitle("Close");
    
        expect(minimizeButton).toBeInTheDocument();
        expect(maximizeButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
    });
    
    it("handle button actions when clicked", async () => {
        const user = userEvent.setup();
        render(<HtmlButtons {...mockProps} />);
    
        const minimizeButton = screen.getByTitle("Minimize");
        const maximizeButton = screen.getByTitle("Maximize");
        const closeButton = screen.getByTitle("Close");
    
        await user.click(minimizeButton);
        await user.click(maximizeButton);
        await user.click(closeButton);
    
        expect(mockProps.minimize.onClick).toHaveBeenCalledTimes(1);
        expect(mockProps.maximize.onClick).toHaveBeenCalledTimes(1);
        expect(mockProps.close.onClick).toHaveBeenCalledTimes(1);
    });
    

    it("hide specific buttons based on visibility settings", () => {
        render(<HtmlButtons {...{...mockProps, minimize: {...mockProps.minimize, visible: false}, close: {...mockProps.close, visible: false}}} />);
    
        const minimizeButton = screen.queryByTitle("Minimize");
        const maximizeButton = screen.getByTitle("Maximize");
        const closeButton = screen.queryByTitle("Close");
    
        expect(minimizeButton).not.toBeInTheDocument();
        expect(maximizeButton).toBeInTheDocument();
        expect(closeButton).not.toBeInTheDocument();
    });
    

    it("apply custom tooltips for buttons", () => {
        render(<HtmlButtons {...mockProps} />);
    
        expect(screen.getByTitle("Feedback")).toBeInTheDocument();
        expect(screen.getByTitle("Clone")).toBeInTheDocument();
    
        const customButton1 = screen.getByTitle("Custom Button 1");
        const customButton2 = screen.getByTitle("Custom Button 2");
    
        expect(customButton1).toBeInTheDocument();
        expect(customButton2).toBeInTheDocument();
    });
});
