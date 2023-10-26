import { Bounds, GroupWrapperProps, StandardButtons, StylesOptions, TargetType, WebGroupsManager } from "./types/internal";
import callbackRegistry from "callback-registry";

declare const window: Window & { webGroupsManager: WebGroupsManager };

class WebGroupsManagerDecorator {
    private readonly registry = callbackRegistry();
    public readonly skipFocusStyle = "t42-skip-focus";

    public init(io: any, componentFactory: any) {
        if (window.webGroupsManager) {
            window.webGroupsManager.init(componentFactory);
        } else {
            throw new Error(`Could not find the webGroupsManager the groups library should be loaded as a group application`);
        }
    }

    public getGroupId() {
        return window.webGroupsManager.externalLibraryFactory.groupId;
    }

    public notifyMoveAreaChanged() {
        window.webGroupsManager.notifyMoveAreaChanged();
    }

    public registerPopup(element: HTMLElement): string {
        return window.webGroupsManager.registerPopup(element);
    }

    public removePopup(element: HTMLElement): void {
        return window.webGroupsManager.removePopup(element);
    }

    public removePopupById(elementId: string): void {
        return window.webGroupsManager.removePopupById(elementId);
    }

    public subscribeForWindowFocused(cb: () => any): () => void {
        return window.webGroupsManager.subscribeForWindowFocused(cb);
    }

    public unmount(): void {
        return window.webGroupsManager.unmount();
    }

    public requestPageFocus(): void {
        return window.webGroupsManager.externalLibraryFactory.focusPage();
    }

    public requestFrameFocus(frameId: string): void {
        return window.webGroupsManager.externalLibraryFactory.focusFrame(frameId);
    }

    public requestGroupFocus(): void {
        return window.webGroupsManager.externalLibraryFactory.focusGroup();
    }

    public closeFrame(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Frame, targetId, StandardButtons.Close);
    }

    public restoreFrame(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Frame, targetId, StandardButtons.Restore);
    }

    public maximizeFrame(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Frame, targetId, StandardButtons.Maximize);
    }

    public minimizeFrame(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Frame, targetId, StandardButtons.Minimize);
    }

    public lockFrame(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Frame, targetId, StandardButtons.Lock);
    }

    public unlockFrame(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Frame, targetId, StandardButtons.Unlock);
    }

    public feedbackFrame(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Frame, targetId, StandardButtons.Feedback);
    }

    public stickyFrame(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Frame, targetId, StandardButtons.Sticky);
    }

    public extractFrame(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Frame, targetId, StandardButtons.Extract);
    }

    public closeTabBar(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.TabBar, targetId, StandardButtons.Close);
    }

    public restoreTabBar(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.TabBar, targetId, StandardButtons.Restore);
    }

    public maximizeTabBar(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.TabBar, targetId, StandardButtons.Maximize);
    }

    public minimizeTabBar(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.TabBar, targetId, StandardButtons.Minimize);
    }

    public lockTabBar(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.TabBar, targetId, StandardButtons.Lock);
    }

    public unlockTabBar(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.TabBar, targetId, StandardButtons.Unlock);
    }

    public feedbackTabBar(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.TabBar, targetId, StandardButtons.Feedback);
    }

    public stickyTabBar(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.TabBar, targetId, StandardButtons.Sticky);
    }

    public extractTabBar(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.TabBar, targetId, StandardButtons.Extract);
    }

    public closeGroup(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Group, targetId, StandardButtons.Close);
    }

    public restoreGroup(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Group, targetId, StandardButtons.Restore);
    }

    public maximizeGroup(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Group, targetId, StandardButtons.Maximize);
    }

    public minimizeGroup(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onStandardButtonClick(TargetType.Group, targetId, StandardButtons.Minimize);
    }

    public closeTab(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onTabCloseButtonClick(targetId);
    }

    public clickCustomButton(targetId: string, buttonId: string): void {
        window.webGroupsManager.externalLibraryFactory.onCustomButtonClick(TargetType.Frame, targetId, buttonId);
    }

    public onGroupMoveAreaChanged(targetId: string): void {
        window.webGroupsManager.externalLibraryFactory.onMoveAreaChanged(TargetType.Group, targetId);
    }

    public onTabChannelSelectorClick(targetId: string, selectorBounds: Bounds): void {
        window.webGroupsManager.externalLibraryFactory.onTabChannelSelectorClick(targetId, selectorBounds);
    }

    public onFrameChannelSelectorClick(targetId: string, selectorBounds: Bounds): void {
        window.webGroupsManager.externalLibraryFactory.onFrameChannelSelectorClick(targetId, selectorBounds);
    }

    public onCaptionTextBoundsChanged(targetType: TargetType, targetId: string, bounds: Bounds): void {
        if (typeof window.webGroupsManager.externalLibraryFactory.onCaptionTextBoundsChanged !== "function") {
            // Handling the case when a new library is used with an older version of io.Connect Desktop
            return;
        }
        window.webGroupsManager.externalLibraryFactory.onCaptionTextBoundsChanged(targetType, targetId, bounds);
    }

    public onCaptionEditorVisibleChanged(targetType: TargetType, targetId: string, visible: boolean): void {
        if (typeof window.webGroupsManager.externalLibraryFactory.onCaptionEditorVisibleChanged !== "function") {
            // Handling the case when a new library is used with an older version of io.Connect Desktop
            return;
        }
        window.webGroupsManager.externalLibraryFactory.onCaptionEditorVisibleChanged(targetType, targetId, visible);
    }

    public onCaptionEditorBoundsChanged(targetType: TargetType, targetId: string, bounds: Bounds): void {
        if (typeof window.webGroupsManager.externalLibraryFactory.onCaptionEditorBoundsChanged !== "function") {
            // Handling the case when a new library is used with an older version of io.Connect Desktop
            return;
        }
        window.webGroupsManager.externalLibraryFactory.onCaptionEditorBoundsChanged(targetType, targetId, bounds);
    }

    public commitCaptionEditing(targetType: TargetType, targetId: string, text: string): void {
        if (typeof window.webGroupsManager.externalLibraryFactory.commitCaptionEditing !== "function") {
            // Handling the case when a new library is used with an older version of io.Connect Desktop
            return;
        }
        window.webGroupsManager.externalLibraryFactory.commitCaptionEditing(targetType, targetId, text);
    }

    public onCommitCaptionEditingRequested(targetType: TargetType, targetId: string, callback: () => void): () => void {
        return this.registry.add(`${targetType}-${targetId}`, callback);
    }

    public requestCommitCaptionEditing(targetType: TargetType, targetId: string) {
        this.registry.execute(`${targetType}-${targetId}`);
    }

    public updateTabHeaderStyles(styles: StylesOptions) {
        window.webGroupsManager.externalLibraryFactory.updateTabHeaderStyles(styles);
    }

    public updateTabMoveAreaStyles(styles: StylesOptions) {
        window.webGroupsManager.externalLibraryFactory.updateTabMoveAreaStyles(styles);
    }

    public updateFrameStyles(styles: StylesOptions) {
        window.webGroupsManager.externalLibraryFactory.updateFrameStyles(styles);
    }
}

export default new WebGroupsManagerDecorator();