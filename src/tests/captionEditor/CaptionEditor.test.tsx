import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CaptionEditor from "../../defaultComponents/captionEditor/CaptionEditor";
import { TargetType } from "../../types/internal";
const mockProps = {
    targetId: "mockTargetId",
    targetType: TargetType.Tab, // Example target type
    commitChanges: jest.fn(),
    notifyEditorVisibilityChanged: jest.fn(),
    notifyBoundsChanged: jest.fn(),
    hideEditor: jest.fn(),
    caption: "Initial Caption",
    className: "caption-editor-class",
};


describe("CaptionEditor component should", () => {

    it("render the editor with the correct initial caption", () => {
        render(<CaptionEditor {...mockProps} />);

        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue("Initial Caption");
    });

    it("focus the input element on render", async () => {
        render(<CaptionEditor {...mockProps} />);

        const inputElement = screen.getByRole("textbox");
        await waitFor(() => expect(inputElement).toHaveFocus())
    });

    it("update the state as the user types in the input", async () => {
        const user = userEvent.setup();
        render(<CaptionEditor {...mockProps} />);

        const inputElement = screen.getByRole("textbox");

        // Simulate typing in the input
        await user.type(inputElement, " Updated");
        expect(inputElement).toHaveValue("Initial Caption Updated");
    });

    it("resize the input dynamically based on the text", async () => {
        const user = userEvent.setup();
        render(<CaptionEditor {...mockProps} />);

        const inputElement = screen.getByRole("textbox");
        const measurementSpan = screen.getByText("Initial Caption", { exact: false }); // Assuming it's the span used for measurement

        // Simulate typing additional text
        await user.type(inputElement, " More Text");

        // Check that the measurement span contains the updated text
        expect(measurementSpan).toHaveTextContent("Initial Caption More Text");

        // Check that the input's width has been adjusted
        const computedWidth = measurementSpan.offsetWidth;
        expect(inputElement).toHaveStyle(`width: ${computedWidth}px`);
    });

    it("commit changes when the input loses focus", async () => {
        const user = userEvent.setup();
        const mockCommitChanges = jest.fn();

        render(<CaptionEditor {...mockProps} commitChanges={mockCommitChanges} />);

        const inputElement = screen.getByRole("textbox");

        // Simulate typing a new caption
        await user.type(inputElement, " Updated Caption");

        // Simulate losing focus
        fireEvent.blur(inputElement);

        // Ensure the commitChanges function is called with the updated caption
        expect(mockCommitChanges).toHaveBeenCalledWith("Initial Caption Updated Caption");
    });

    it("commit changes when pressing the Enter key", async () => {
        const user = userEvent.setup();
        const mockCommitChanges = jest.fn();

        render(<CaptionEditor {...mockProps} commitChanges={mockCommitChanges} />);

        const inputElement = screen.getByRole("textbox");

        // Simulate typing a new caption
        await user.type(inputElement, " Updated Caption");

        // Simulate pressing Enter
        await user.keyboard("{Enter}");

        // Ensure the commitChanges function is called with the updated caption
        expect(mockCommitChanges).toHaveBeenCalledWith("Initial Caption Updated Caption");
    });

    it("cancel editing and revert to the original caption", async () => {
        const user = userEvent.setup();
        const mockHideEditor = jest.fn();
    
        render(<CaptionEditor {...mockProps} hideEditor={mockHideEditor} />);
    
        const inputElement = screen.getByRole("textbox");
    
        // Simulate typing a new caption
        await user.type(inputElement, " New Caption");
    
        // Simulate pressing the Escape key
        await user.keyboard("{Escape}");
    
        // Ensure the editor is hidden without committing changes
        expect(mockHideEditor).toHaveBeenCalled();
        expect(mockProps.commitChanges).not.toHaveBeenCalled();
    });
    
    it("notify visibility change when the editor is shown or hidden", async () => {
        const mockNotifyVisibilityChanged = jest.fn();
    
        render(<CaptionEditor {...mockProps} notifyEditorVisibilityChanged={mockNotifyVisibilityChanged} />);
    
        expect(mockNotifyVisibilityChanged).toHaveBeenCalled();
        
        const inputElement = screen.getByRole("textbox");
        fireEvent.blur(inputElement);
        
        expect(mockNotifyVisibilityChanged).toHaveBeenCalled();
    });

    it("notify bounds change when the editor resizes", () => {
        const mockNotifyBoundsChanged = jest.fn();
    
        render(<CaptionEditor {...mockProps} notifyBoundsChanged={mockNotifyBoundsChanged} />);
    
        // Ensure bounds are notified when the component is rendered
        expect(mockNotifyBoundsChanged).toHaveBeenCalledWith(expect.objectContaining({
            width: expect.any(Number),
            height: expect.any(Number),
        }));
    });
    
});
