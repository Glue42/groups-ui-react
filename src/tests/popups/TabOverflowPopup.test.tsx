import { render, screen } from "@testing-library/react";
import TabOverflowPopup from "../../defaultComponents/popups/TabOverflowPopup";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("Popup component should", () => {
    it("display the correct content based on props", () => {
        const mockProps = {
            frameId: "mockFrameId",
            select: jest.fn(),
            close: jest.fn(),
            hiddenTabsToTheLeft: [{ title: "Tab 1", windowId: "tab1" }],
            hiddenTabsToTheRight: [{ title: "Tab 2", windowId: "tab2" }],
        };
    
        render(<TabOverflowPopup {...mockProps} />);
    
        expect(screen.getByText("Tab 1")).toBeInTheDocument();
        expect(screen.getByText("Tab 2")).toBeInTheDocument();
    });
    

    it("render sections based on hidden tabs", () => {
        const mockProps = {
            frameId: "mockFrameId",
            hiddenTabsToTheLeft: [{ title: "Left Tab", windowId: "left1" }],
            hiddenTabsToTheRight: [],
            close: jest.fn(),
            select: jest.fn(),
        };

        render(<TabOverflowPopup {...mockProps} />);

        expect(screen.getByText("Open left")).toBeInTheDocument();
        expect(screen.queryByText("Open right")).not.toBeInTheDocument();
    });

    it("handle tab selection via the select callback", async () => {
        const selectMock = jest.fn();
        const mockProps = {
            frameId: "mockFrameId",
            hiddenTabsToTheLeft: [{ title: "Left Tab", windowId: "left1" }],
            hiddenTabsToTheRight: [],
            close: jest.fn(),
            select: selectMock,
        };

        const user = userEvent.setup();
        render(<TabOverflowPopup {...mockProps} />);

        const leftTab = screen.getByText("Left Tab");
        await user.click(leftTab);

        expect(selectMock).toHaveBeenCalledWith("left1");
    });

    it("handle tab close via the close callback", async () => {
        const closeMock = jest.fn();
        const mockProps = {
            frameId: "mockFrameId",
            hiddenTabsToTheLeft: [{ title: "Left Tab", windowId: "left1" }],
            hiddenTabsToTheRight: [],
            close: closeMock,
            select: jest.fn(),
        };

        const user = userEvent.setup();
        const {baseElement} = render(<TabOverflowPopup {...mockProps} />);

        const closeButton = baseElement.getElementsByClassName("t42-tab-close-button-content")[0]; // Adjust if needed
        await user.click(closeButton);

        expect(closeMock).toHaveBeenCalledWith("left1");
    });
});
