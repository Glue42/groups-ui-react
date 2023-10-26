import React, { CSSProperties } from "react";
import { Bounds, ButtonProps, StylesOptions, ToggleButtonProps } from "./internal";
import { CustomButtonProps } from "./defaultComponents";

export interface ChannelProps {
    visible: boolean;
    selectedChannel: string;
    showSelector: (bounds: Bounds) => void;
    selectedChannelColor: string;
}

export interface FrameWindowOverlayProps {
    frameId: string;
    selectedWindow: string;
}

export interface AboveWindowProps {
    frameId: string;
    selectedWindow: string;
}

export interface WindowContentOverlayProps {
    frameId: string;
    selectedWindow: string;
}

export interface FrameLoadingAnimationProps {
    frameId: string;
    selectedWindow: string;
    show: boolean;
}

export interface BelowWindowProps {
    frameId: string;
    selectedWindow: string;
}

export interface AboveTabsProps {
    frameId: string;
    selectedWindow: string;
}

export interface BeforeTabsProps {
    frameId: string;
    selectedWindow: string;
}

export interface BelowTabsProps {
    frameId: string;
    selectedWindow: string;
}

export interface CaptionEditorProps {
    show: boolean;
    text?: string;
    commitChanges: (text: string) => void;
    hideEditor: () => void;
    notifyBoundsChanged: (bounds: Bounds) => void;
    notifyEditorVisibilityChanged: (visible: boolean) => void;
}

export interface GroupCaptionBarProps {
    moveAreaId: string;
    targetType: string;
    targetId: string;
    caption: string;
    captionEditor?: CaptionEditorProps;
    visible: boolean,
    notifyCaptionBoundsChanged: (bounds: Bounds) => void;

    minimize: ButtonProps;
    maximize: ButtonProps;
    restore: ButtonProps;
    close: ButtonProps;
}

export interface GroupOverlayProps {

}

export interface FlatCaptionBarProps {
    frameId: string;
    moveAreaId: string;
    caption: string;
    feedback?: ButtonProps;
    sticky?: ToggleButtonProps;
    extract?: ButtonProps;
    lock?: ButtonProps;
    unlock?: ButtonProps;
    minimize?: ButtonProps;
    maximize?: ButtonProps;
    restore?: ButtonProps;
    close?: ButtonProps;
    channels: ChannelProps;
    customButtons: CustomButtonProps[];
    selectedWindow: string;
    notifyCaptionBoundsChanged: (bounds: Bounds) => void;
    captionEditor: CaptionEditorProps;
}

export interface TabElementProps {
    targetId: string;
    windowId: string;
    caption: string;
    selected: boolean;
    flashing: boolean;
    close: () => void;
    channels: ChannelProps;
    notifyCaptionBoundsChanged: (bounds: Bounds) => void;
    captionEditor: CaptionEditorProps;
}

export interface AfterTabsProps {
    frameId: string;
    selectedWindow: string;
}

export interface TabHeaderButtonsProps {
    feedback?: ButtonProps;
    sticky?: ToggleButtonProps;
    extract?: ButtonProps;
    lock?: ButtonProps;
    unlock?: ButtonProps;
    minimize?: ButtonProps;
    maximize?: ButtonProps;
    restore?: ButtonProps;
    close?: ButtonProps;
    customButtons: CustomButtonProps[];
    frameId: string;
    selectedWindow: string;
}

export interface GroupProps {
    components?: {
        group?: {
            CaptionBar?: React.ComponentType<GroupCaptionBarProps>;
            Overlay?: React.ComponentType<GroupOverlayProps>;
        }
        frame?: {
            Overlay?: React.ComponentType<FrameWindowOverlayProps>;
            AboveWindow?: React.ComponentType<AboveWindowProps>;
            WindowContentOverlay?: React.ComponentType<WindowContentOverlayProps>;
            BelowWindow?: React.ComponentType<BelowWindowProps>;
            LoadingAnimation?: React.ComponentType<FrameLoadingAnimationProps>;
        };
        flat?: {
            CaptionBar?: React.ComponentType<FlatCaptionBarProps>;
        };
        tabs?: {
            Above?: React.ComponentType<AboveTabsProps>;
            Before?: React.ComponentType<BeforeTabsProps>;
            Element?: React.ComponentType<TabElementProps>;
            After?: React.ComponentType<AfterTabsProps>;
            Buttons?: React.ComponentType<TabHeaderButtonsProps>;
            Below?: React.ComponentType<BelowTabsProps>;
        }
    },
    styles?: {
        tabs?: {
            header?: StylesOptions;
            moveArea?: StylesOptions;
        },
        frame?: {
            element?: StylesOptions;
        }
    }
}

export interface MoveAreaProps {
    elementId: string;
}

export interface GroupComponentVisibilityState {
    groupCaptionBarVisible?: boolean;
}