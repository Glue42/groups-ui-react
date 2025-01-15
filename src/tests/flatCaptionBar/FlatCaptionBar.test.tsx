import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import FlatCaptionBar from "../../defaultComponents/flatCaptionBar/FlatCaptionBar";
import userEvent from "@testing-library/user-event";

const mockProps = {
    frameId: "mockFrameId",
    moveAreaId: "mockMoveAreaId",
    caption: "Test Caption",

    feedback: {
        onClick: jest.fn(),
        tooltip: "Feedback tooltip",
        visible: true,
    },
    clone: {
        onClick: jest.fn(),
        tooltip: "Clone tooltip",
        visible: true,
    },
    sticky: {
        onClick: jest.fn(),
        tooltip: "Sticky tooltip",
        visible: true,
        isPressed: false,
    },
    extract: {
        onClick: jest.fn(),
        tooltip: "Extract tooltip",
        visible: true,
    },
    lock: {
        onClick: jest.fn(),
        tooltip: "Lock tooltip",
        visible: true,
    },
    unlock: {
        onClick: jest.fn(),
        tooltip: "Unlock tooltip",
        visible: true,
    },
    minimize: {
        onClick: jest.fn(),
        tooltip: "Minimize tooltip",
        visible: true,
    },
    maximize: {
        onClick: jest.fn(),
        tooltip: "Maximize tooltip",
        visible: true,
    },
    restore: {
        onClick: jest.fn(),
        tooltip: "Restore tooltip",
        visible: true,
    },
    close: {
        onClick: jest.fn(),
        tooltip: "Close tooltip",
        visible: true,
    },

    channels: {
        visible: true,
        selectedChannel: "mockChannel",
        showSelector: jest.fn(),
        selectedChannelColor: "#00FF00",
    },

    customButtons: [
        {
            buttonId: "custom-1",
            tooltip: "Custom Button 1",
            imageData: "data:image/png;base64,icon1",
            onClick: jest.fn(),
            visible: false
        },
        {
            buttonId: "custom-2",
            tooltip: "Custom Button 2",
            imageData: "data:image/png;base64,icon2",
            onClick: jest.fn(),
            visible: false
        },
    ],

    selectedWindow: "mockSelectedWindow",

    captionEditor: {
        targetId: "mockTargetId",
        targetType: "Tab",
        caption: "Editable Caption",
        className: "editor-class",
        show: false,
        text: "Initial Text",
        commitChanges: jest.fn(),
        hideEditor: jest.fn(),
        notifyEditorVisibilityChanged: jest.fn(), 
        notifyBoundsChanged: jest.fn(),
    },

    notifyCaptionBoundsChanged: jest.fn(),
};

describe("FlatCaptionBar component should", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it("render the caption bar with the correct default components", () => {
        const { baseElement } = render(<FlatCaptionBar {...mockProps} />);

        const caption = screen.getByText("Test Caption");
        expect(caption).toBeInTheDocument();

        const closeButton = baseElement.getElementsByClassName("t42-standard-button-close")[0];
        expect(closeButton).toBeInTheDocument();

        const moveArea = baseElement.getElementsByClassName("t42-move-area")[0];
        expect(moveArea).toBeInTheDocument();
    });

    it("render the caption text and handle its visibility based on props", () => {
        const { rerender } = render(<FlatCaptionBar {...mockProps} caption="Visible Caption" />);

        const visibleCaption = screen.getByText("Visible Caption");
        expect(visibleCaption).toBeInTheDocument();

        rerender(<FlatCaptionBar {...mockProps} caption="" />);
        const hiddenCaption = screen.queryByText("Visible Caption");
        expect(hiddenCaption).not.toBeInTheDocument();
    });


    it("switch to editing mode when the caption is clicked", async () => {
        const user = userEvent.setup();
        render(<FlatCaptionBar {...mockProps} captionEditor={{ ...mockProps.captionEditor, show: false }} />);

        const caption = screen.getByText("Test Caption");
        await user.click(caption);

        waitFor(() => {
            const editor = screen.getByRole("textbox");
            expect(editor).toBeInTheDocument();
            expect(editor).toHaveValue("Editable Caption");
        })
    });


    it("save the caption when editing is committed", async () => {
        const user = userEvent.setup();
        const commitMock = jest.fn();
        render(
            <FlatCaptionBar
                {...mockProps}
                captionEditor={{
                    ...mockProps.captionEditor,
                    show: true,
                    commitChanges: commitMock,
                }}
            />
        );

        const editor = screen.getByRole("textbox");
        await user.type(editor, " Updated");
        await user.keyboard("{Enter}");

        waitFor(() => expect(commitMock).toHaveBeenCalledWith("Editable Caption Updated"));
    });

    it("revert to the original caption when editing is canceled", async () => {
        const user = userEvent.setup();
        render(
            <FlatCaptionBar
                {...mockProps}
                captionEditor={{
                    ...mockProps.captionEditor,
                    show: true,
                    text: "Editable Caption",
                    hideEditor: jest.fn(),
                }}
            />
        )

        const editor = screen.getByRole("textbox");

        await user.type(editor, " Modified");

        await user.keyboard("{Escape}");

        waitFor(() => {
            const caption = screen.getByText("Editable Caption");
            expect(caption).toBeInTheDocument();
            expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        })
    });


    it("hide action buttons based on props", () => {
        const { rerender} = render(
            <FlatCaptionBar {...mockProps} lock={{ ...mockProps.lock, visible: false }} />
        );
    
        const lockButton = screen.queryByTitle("Lock tooltip");
        expect(lockButton).not.toBeInTheDocument();
    
        rerender(<FlatCaptionBar {...mockProps} lock={{ ...mockProps.lock, visible: true }} />);
        const visibleLockButton = screen.getByTitle("Lock tooltip");
        expect(visibleLockButton).toBeInTheDocument();
    });
});
