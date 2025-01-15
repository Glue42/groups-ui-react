import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tab from "../../defaultComponents/tabs/Tab";

const mockProps = {
    caption: "Test Tab",
    selected: false,
    close: jest.fn(),
    channels: {
        visible: false, 
        showSelector: jest.fn(), 
        selectedChannel: "defaultChannel",
        selectedChannelColor: "#000",
    },
    captionEditor: {
        show: false, 
        text: "",
        windowId: "mockWindowId",
        selected: false, 
        commitChanges: jest.fn(),
        notifyEditorVisibilityChanged: jest.fn(),
        notifyBoundsChanged: jest.fn(),
        hideEditor: jest.fn(),
    },
    notifyCaptionBoundsChanged: jest.fn(),
    windowId: "testWindowId",
    pinned: false,
    targetId: "mockTargetId",
    flashing: false,
    addContainerClass: jest.fn(),
    removeContainerClass: jest.fn(),
};

describe("Tab component should", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it("display the correct caption and default components when rendered", () => {
        render(<Tab {...mockProps} />);

        const caption = screen.getByText("Test Tab");
        expect(caption).toBeInTheDocument();
        expect(screen.queryByTitle("close")).toBeInTheDocument(); 
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

    it("switch to editing mode when the caption is clicked", async () => {
        render(<Tab {...mockProps} captionEditor={{ ...mockProps.captionEditor, show: true, text: "Editable Caption" }} />);

        const editableCaption = screen.getByRole("textbox") as HTMLInputElement;
        expect(editableCaption).toBeInTheDocument();
        expect(editableCaption.value).toBe("Editable Caption");
    });

    it("save the new caption when editing is committed", async () => {
        const updatedProps = {
            ...mockProps,
            captionEditor: { ...mockProps.captionEditor, show: true, text: "Editable Caption" },
        };
        const user = userEvent.setup();
        render(<Tab {...updatedProps} />);

        const editableCaption = screen.getByRole("textbox") as HTMLInputElement;
        await user.type(editableCaption, " Updated");
        expect(editableCaption.value).toBe("Editable Caption Updated");

        await user.click(document.body);

        await waitFor(() => {
            expect(screen.getByText("Editable Caption Updated")).toBeInTheDocument();
        });
    });

    it("remove the tab when the close button is clicked", async () => {
        const user = userEvent.setup();
        render(<Tab {...mockProps} />);

        const closeButton = screen.getByTitle("close");
        expect(closeButton).toBeInTheDocument();
        await user.click(closeButton);

        expect(mockProps.close).toHaveBeenCalledTimes(1);
    });

    it("mark a tab as selected when clicked", async () => {
        const user = userEvent.setup();
        const { rerender } = render(<Tab {...mockProps} selected={false} />);

        const tab = screen.getByText("Test Tab");
        expect(tab).toBeInTheDocument();
        expect(tab).not.toHaveClass("selected");

        await user.click(tab);

        rerender(<Tab {...mockProps} selected={true} />);

        waitFor(() => expect(tab).toHaveClass("selected"));
    });

    it("hide the close button when the tab is pinned", () => {
        render(<Tab {...mockProps} pinned={true} />);

        const closeButton = screen.queryByTitle("close");
        expect(closeButton).not.toBeInTheDocument();
    });

    it("show the channel selector when visible is true", () => {
        const { baseElement } = render(<Tab {...mockProps} channels={{ ...mockProps.channels, visible: true }} />);

        const channelSelector = baseElement.getElementsByClassName("t42-tab-channel-selector")[0];
        expect(channelSelector).toBeInTheDocument();
    });

    it("should open channel selector popup on click", async () => {
        const user = userEvent.setup();
        const { baseElement } = render(<Tab {...mockProps} channels={{ ...mockProps.channels, visible: true }} />);

        const channelSelector = baseElement.getElementsByClassName("t42-tab-channel-selector")[0];
        await user.click(channelSelector);

        waitFor(() => {
            expect(mockProps.channels.showSelector).toHaveBeenCalled();
        })
    })    
});