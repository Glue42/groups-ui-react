import React from "react";

type NonMethodKeys<T> = ({ [P in keyof T]: T[P] extends Function ? never : P })[keyof T];
type NonMethods<T> = Pick<T, NonMethodKeys<T>>;

export interface PortalProps {
	parentElement: HTMLElement;
	children?: React.ReactNode;
}

export interface ButtonProps {
	onClick: () => void;
	tooltip: string;
	visible: boolean;
}

export interface ToggleButtonProps extends ButtonProps {
	isPressed: boolean;
}

export interface GroupWrapperProps {
	onCreateGroupCaptionBarRequested?: (options: CreateGroupCaptionBarRequestOptions) => void;
	onUpdateGroupCaptionBarRequested?: (options: UpdateGroupCaptionBarRequestOptions) => void;

	onCreateGroupOverlayRequested?: (options: CreateElementRequestOptions) => void;

	onCreateFrameCaptionBarRequested?: (options: CreateFrameCaptionBarRequestOptions) => void;
	onUpdateFrameCaptionBarRequested?: (options: UpdateFrameCaptionBarRequestOptions) => void;

	onCreateFrameWindowOverlayRequested?: (options: CreateFrameElementRequestOptions) => void;
	onUpdateFrameWindowOverlayRequested?: (options: CreateFrameElementRequestOptions) => void;

	onCreateAboveWindowRequested?: (options: CreateFrameElementRequestOptions) => void;
	onCreateWindowContentOverlayRequested?: (options: CreateFrameElementRequestOptions) => void;
	onCreateFrameLoadingAnimationRequested?: (options: CreateFrameLoadingAnimationRequestOptions) => void;
	onCreateBelowWindowRequested?: (options: CreateFrameElementRequestOptions) => void;

	onCreateAboveTabsRequested?: (options: CreateFrameElementRequestOptions) => void;
	onUpdateAboveTabsRequested?: (options: CreateFrameElementRequestOptions) => void;

	onCreateBeforeTabsComponentRequested?: (options: CreateFrameElementRequestOptions) => void;
	onUpdateBeforeTabsComponentRequested?: (options: CreateFrameElementRequestOptions) => void;

	onCreateTabRequested?: (options: CreateTabRequestOptions) => void;
	onUpdateTabRequested?: (options: CreateTabRequestOptions) => void;

	onCreateAfterTabsComponentRequested?: (options: CreateFrameElementRequestOptions) => void;
	onUpdateAfterTabsComponentRequested?: (options: CreateFrameElementRequestOptions) => void;

	onCreateTabHeaderButtonsRequested?: (options: CreateTabHeaderButtonsOptions) => void;

	onCreateBelowTabsRequested?: (options: CreateFrameElementRequestOptions) => void;
	onUpdateBelowTabsRequested?: (options: CreateFrameElementRequestOptions) => void;

	onUpdateFrameRequested?: (options: UpdateFrameRequestOptions) => void;
	onUpdateStandardButtonRequested?: (options: UpdateStandardButtonRequestOptions) => void;
	onUpdateCustomButtonsRequested?: (options: UpdateCustomButtonsRequestOptions) => void;

	onRemoveFrameCaptionBarRequested?: (options: RemoveRequestOptions) => void;
	onRemoveFrameWindowOverlayRequested?: (options: RemoveRequestOptions) => void;
	onRemoveAboveWindowRequested?: (options: RemoveRequestOptions) => void;
	onRemoveWindowContentOverlayRequested?: (options: RemoveRequestOptions) => void;
	onRemoveFrameLoadingAnimationRequested?: (options: RemoveRequestOptions) => void;
	onRemoveBelowWindowRequested?: (options: RemoveRequestOptions) => void;
	onRemoveAboveTabsRequested?: (options: RemoveRequestOptions) => void;
	onRemoveBeforeTabsComponentRequested?: (options: RemoveRequestOptions) => void;
	onRemoveTabRequested?: (options: RemoveRequestOptions) => void;
	onRemoveAfterTabsComponentRequested?: (options: RemoveRequestOptions) => void;
	onRemoveTabHeaderButtonsRequested?: (options: RemoveRequestOptions) => void;
	onRemoveBelowTabsRequested?: (options: RemoveRequestOptions) => void;

	onShowCaptionEditorRequested?: (targetType: TargetType, targetId: string, text: string) => void;
	onCommitCaptionEditingRequested?: (targetType: TargetType, targetId: string) => void;
	onHideCaptionEditorRequested?: (targetType: TargetType, targetId: string) => void;

	onShowLoadingAnimationRequested?: (targetType: TargetType, targetId: string) => void;
	onHideLoadingAnimationRequested?: (targetType: TargetType, targetId: string) => void;
	styles?: {
		tabs?: {
			header?: StylesOptions;
			moveArea?: StylesOptions;
		},
		frame?: {
			element?: StylesOptions;
		}
	};
}

export interface CreateGroupCaptionBarRequestOptions extends CreateElementRequestOptions {
	moveAreaId: string;
	caption: string;
	visible: boolean;
	extract: {
		tooltip: string;
		visible: boolean;
	},
	minimize: {
		tooltip: string;
		visible: boolean;
	};
	restore: {
		tooltip: string;
		visible: boolean;
	};
	maximize: {
		tooltip: string;
		visible: boolean;
	};
	close: {
		tooltip: string;
		visible: boolean;
	};
	captionEditor: {
		show: boolean;
		text?: string;
	};
}

export interface UpdateGroupCaptionBarRequestOptions extends CreateGroupCaptionBarRequestOptions {

}

export interface UpdateFrameCaptionBarRequestOptions extends BaseElementOptions {

}

export interface CreateFrameCaptionBarRequestOptions extends CreateFrameElementRequestOptions {
	caption: string;
	moveAreaId: string;
	channelSelectorVisible: boolean;
	selectedChannel: string;
	selectedChannelColor: string;
	feedback: {
		tooltip: string;
		visible: boolean;
	};
	sticky: {
		tooltip: string;
		visible: boolean;
		isPressed: boolean;
	};
	extract: {
		tooltip: string;
		visible: boolean;
	};
	lock: {
		tooltip: string;
		visible: boolean;
	};
	unlock: {
		tooltip: string;
		visible: boolean;
	};
	minimize: {
		tooltip: string;
		visible: boolean;
	};
	restore: {
		tooltip: string;
		visible: boolean;
	};
	maximize: {
		tooltip: string;
		visible: boolean;
	};
	close: {
		tooltip: string;
		visible: boolean;
	};
	captionEditor: {
		show: boolean;
		text?: string;
	};
	customButtons: UpdateCustomButtonOptions[]
}

export interface CreateTabRequestOptions extends CreateElementRequestOptions {
	caption: string;
	selected: boolean;
	flashing: boolean;
	channelSelectorVisible: boolean;
	selectedChannel: string;
	selectedChannelColor: string;
	captionEditor: {
		show: boolean;
		text?: string;
	};
}

export interface UpdateStandardButtonRequestOptions extends CreateElementRequestOptions {
	buttonId: StandardButtons;
	visible: boolean;
	tooltip: string;
	isPressed: boolean;
}

export interface UpdateCustomButtonsRequestOptions extends CreateElementRequestOptions {
	customButtons: UpdateCustomButtonOptions[];
}

export interface UpdateCustomButtonOptions {
	buttonId: string;
	tooltip: string;
	imageData: string;
}

export interface CreateTabHeaderButtonsOptions extends CreateFrameElementRequestOptions {
	feedback: {
		tooltip: string;
		visible: boolean;
	};
	sticky: {
		tooltip: string;
		visible: boolean;
		isPressed: boolean;
	};
	extract: {
		tooltip: string;
		visible: boolean;
	};
	lock: {
		tooltip: string;
		visible: boolean;
	};
	unlock: {
		tooltip: string;
		visible: boolean;
	};
	minimize: {
		tooltip: string;
		visible: boolean;
	};
	restore: {
		tooltip: string;
		visible: boolean;
	};
	maximize: {
		tooltip: string;
		visible: boolean;
	};
	close: {
		tooltip: string;
		visible: boolean;
	};
	customButtons: UpdateCustomButtonOptions[]
}

export interface RemoveRequestOptions {
	targetId: string;
}

export interface BaseElementOptions {
	targetId: string;
}

export interface CreateElementRequestOptions extends BaseElementOptions {
	parentElement: HTMLElement;
	targetType: TargetType;
	elementId: string;
}

export interface CreateFrameElementRequestOptions extends CreateElementRequestOptions {
	selectedWindow: string;
}

export interface CreateFrameLoadingAnimationRequestOptions extends CreateFrameElementRequestOptions {
	show: boolean;
}

export type UpdateFrameRequestOptions = CreateFrameElementRequestOptions;

export enum TargetType {
	Group = "group",
	Frame = "frame",
	TabBar = "tabBar",
	Tab = "tab"
}

export enum StandardButtons {
	Feedback = "feedback",
	Sticky = "sticky",
	Extract = "extract",
	Lock = "lock",
	Unlock = "unlock",
	Minimize = "minimize",
	Maximize = "maximize",
	Restore = "restore",
	Close = "close",
}

export interface ElementCreationWrapperState {
	groupCaptionBar?: CreateGroupCaptionBarRequestOptions;
	groupOverlay?: CreateElementRequestOptions;
	frameCaptionBars: { [targetId: string]: CreateFrameCaptionBarRequestOptions };
	frameWindowOverlays: { [targetId: string]: CreateFrameElementRequestOptions };
	windowContentOverlays: { [targetId: string]: CreateFrameElementRequestOptions };
	frameLoadingAnimations: { [targetId: string]: CreateFrameLoadingAnimationRequestOptions };
	aboveWindowZones: { [targetId: string]: CreateFrameElementRequestOptions };
	belowWindowZones: { [targetId: string]: CreateFrameElementRequestOptions };
	aboveTabsZones: { [targetId: string]: CreateFrameElementRequestOptions };
	beforeTabsZones: { [targetId: string]: CreateFrameElementRequestOptions };
	tabElements: { [targetId: string]: CreateTabRequestOptions };
	afterTabsZones: { [targetId: string]: CreateFrameElementRequestOptions };
	tabHeaderButtons: { [targetId: string]: CreateTabHeaderButtonsOptions };
	belowTabsZones: { [targetId: string]: CreateFrameElementRequestOptions };
}

export interface ExternalLibraryFactory {
	readonly groupId: string;
	focusPage(): void;
	focusFrame(frameId: string): void;
	focusGroup(): void;
	onStandardButtonClick(targetType: TargetType, targetId: string, buttonId: StandardButtons): void;
	onCustomButtonClick(targetType: TargetType, targetId: string, buttonId: string): void;
	onTabCloseButtonClick(targetId: string): void;
	onTabChannelSelectorClick(targetId: string, channelSelectorBounds: Bounds): void;
	onFrameChannelSelectorClick(targetId: string, channelSelectorBounds: Bounds): void;
	onMoveAreaChanged(targetType: TargetType, targetId: string): void;
	onCaptionTextBoundsChanged(targetType: TargetType, targetId: string, bounds: Bounds): void;
	onCaptionEditorVisibleChanged(targetType: TargetType, targetId: string, visible: boolean): void;
	onCaptionEditorBoundsChanged(targetType: TargetType, targetId: string, bounds: Bounds): void;
	commitCaptionEditing(targetType: TargetType, targetId: string, text: string): void;

	updateTabHeaderStyles(styles: StylesOptions): void;
	updateTabMoveAreaStyles(styles: StylesOptions): void;
	updateFrameStyles(styles: StylesOptions): void;
}

export interface WebGroupsManager {
	init: (factory?: any) => void;
	notifyMoveAreaChanged(): void;
	registerPopup(element: HTMLElement): string;
	removePopup(element: HTMLElement): void;
	removePopupById(elementId: string): void;
	subscribeForWindowFocused(cb: () => any): () => void;
	unmount(): void;
	externalLibraryFactory: ExternalLibraryFactory;
}

export interface Size {
	width: number;
	height: number;
}

export interface Bounds extends Size {
	left: number;
	top: number;
}

export interface StylesOptions {
	css?: Partial<NonMethods<CSSStyleDeclaration>>;
	classes?: string[]
}
