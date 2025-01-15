import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GroupCaptionBar from "../../defaultComponents/groupCaptionBar/GroupCaptionBar";

const mockProps = {
    moveAreaId: "mockMoveAreaId", 
    targetType: "group", 
    targetId: "mockTargetId",
    caption: "Test Group Caption",
    visible: true, 

    captionEditor: {
        show: false,
        text: "Editable Group Caption",
        commitChanges: jest.fn(),
        hideEditor: jest.fn(),
        notifyBoundsChanged: jest.fn(),
        notifyEditorVisibilityChanged: jest.fn(),
    },

    notifyCaptionBoundsChanged: jest.fn(),

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
};

describe("GroupCaptionBar component should", () => {
    it("render the group caption bar with default components", () => {
        const { baseElement } = render(<GroupCaptionBar {...mockProps} />);

        const caption = screen.getByText("Test Group Caption");
        expect(caption).toBeInTheDocument();

        const moveArea = baseElement.getElementsByClassName("t42-move-area")[0];
        expect(moveArea).toBeInTheDocument();

        const closeButton = baseElement.getElementsByClassName("t42-standard-button-close")[0];
        expect(closeButton).toBeInTheDocument();
    });


    it("display the caption text and update visibility based on props", () => {
        const { rerender } = render(
            <GroupCaptionBar {...mockProps} caption="Visible Caption" visible={true} />
        );

        const visibleCaption = screen.getByText("Visible Caption");
        expect(visibleCaption).toBeInTheDocument();

        rerender(<GroupCaptionBar {...mockProps} visible={false} />);
        const hiddenCaption = screen.queryByText("Visible Caption");
        expect(hiddenCaption).not.toBeInTheDocument();
    });


    it("enable caption editing when clicked", async () => {
        const user = userEvent.setup();
        render(
            <GroupCaptionBar
                {...mockProps}
                captionEditor={{ ...mockProps.captionEditor, show: false }}
            />
        );

        const caption = screen.getByText("Test Group Caption");
        await user.click(caption);

        waitFor(() => {
            const editor = screen.getByRole("textbox");
            expect(editor).toBeInTheDocument();
            expect(editor).toHaveValue("Editable Group Caption");
        })
    });


    it("save the caption after editing is committed", async () => {
        const commitMock = jest.fn();
        render(
            <GroupCaptionBar
                {...mockProps}
                captionEditor={{ ...mockProps.captionEditor, show: true, commitChanges: commitMock }}
            />
        );

        const editor = screen.getByRole("textbox");

        const user = userEvent.setup();
        await user.type(editor, " Updated");

        await user.keyboard("{Enter}");

        expect(commitMock).toHaveBeenCalledWith("Editable Group Caption Updated");
    });


    it("cancel caption editing and revert to the original caption", async () => {
        const hideEditorMock = jest.fn();
        render(
            <GroupCaptionBar
                {...mockProps}
                captionEditor={{
                    ...mockProps.captionEditor,
                    show: true,
                    text: "Editable Group Caption",
                    hideEditor: hideEditorMock,
                }}
            />
        );

        const editor = screen.getByRole("textbox");

        const user = userEvent.setup();
        await user.type(editor, " Modified");

        await user.keyboard("{Escape}");

        waitFor(() => {
            expect(hideEditorMock).toHaveBeenCalled();
            const originalCaption = screen.getByText("Editable Group Caption");
            expect(originalCaption).toBeInTheDocument();
            expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        })
    });


    it("hide or display buttons based on props", () => {
        const { rerender } = render(
            <GroupCaptionBar {...mockProps} minimize={{ ...mockProps.minimize, visible: false }} />
        );

        const minimizeButton = screen.queryByTitle("Minimize");
        expect(minimizeButton).not.toBeInTheDocument();

        rerender(
            <GroupCaptionBar {...mockProps} minimize={{ ...mockProps.minimize, visible: true }} />
        );
        const visibleMinimizeButton = screen.getByTitle("Minimize");
        expect(visibleMinimizeButton).toBeInTheDocument();
    });
});
