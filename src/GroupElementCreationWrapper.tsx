import React from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import GroupWrapper from "./GroupWrapper";
import Portal from "./Portal";
import { ChannelProps, GroupProps } from "./types/api";
import { Bounds, ElementCreationWrapperState, TargetType } from "./types/internal";
import { CustomButtonProps } from "./types/defaultComponents";
import webGroupsManager from "./webGroupsManager";
import webGroupsStore from "./webGroupsStore";

const GroupElementCreationWrapper: React.FC<GroupProps> = ({ components, styles }) => {

    const state = useSyncExternalStore<ElementCreationWrapperState>(webGroupsStore.subscribe, webGroupsStore.getSnapshot);

    const renderGroupCaptionBar = () => {
        const GroupCaptionBarCustomElement = components?.group?.CaptionBar;
        if (!GroupCaptionBarCustomElement || (!state.groupCaptionBar || !state.groupCaptionBar.parentElement)) {
            return;
        }

        const { parentElement, ...options } = state.groupCaptionBar;

        const minimize = {
            onClick: () => {
                webGroupsManager.minimizeGroup(options.targetId);
            },
            ...options.minimize
        }

        const restore = {
            onClick: () => {
                webGroupsManager.restoreGroup(options.targetId);
            },
            ...options.restore
        }

        const maximize = {
            onClick: () => {
                webGroupsManager.maximizeGroup(options.targetId);
            },
            ...options.maximize
        }

        const close = {
            onClick: () => {
                webGroupsManager.closeGroup(options.targetId);
            },
            ...options.close
        }

        const captionEditor = {
            ...options.captionEditor,
            commitChanges: (text: string) => {
                webGroupsManager.commitCaptionEditing(TargetType.Group, options.targetId, text);
            },
            hideEditor: () => {
                webGroupsStore.onHideCaptionEditorRequested(TargetType.Group, options.targetId);
            },
            notifyBoundsChanged: (bounds: Bounds) => {
                webGroupsManager.onCaptionEditorBoundsChanged(TargetType.Group, options.targetId, bounds);
            },
            notifyEditorVisibilityChanged: (visible: boolean) => {
                webGroupsManager.onCaptionEditorVisibleChanged(TargetType.Group, options.targetId, visible);
            }
        };

        const notifyCaptionBoundsChanged = (bounds: Bounds) => webGroupsManager.onCaptionTextBoundsChanged(TargetType.Group, options.targetId, bounds);

        return (
            <Portal parentElement={parentElement}>
                <GroupCaptionBarCustomElement {...options}
                    minimize={minimize}
                    maximize={maximize}
                    restore={restore}
                    close={close}
                    captionEditor={captionEditor}
                    notifyCaptionBoundsChanged={notifyCaptionBoundsChanged} />
            </Portal>
        );
    }

    const renderGroupOverlay = () => {
        const GroupOverlayCustomElement = components?.group?.Overlay;
        if (!GroupOverlayCustomElement || (!state.groupOverlay || !state.groupOverlay.parentElement)) {
            return;
        }

        const { parentElement, ...options } = state.groupOverlay;


        return <Portal parentElement={parentElement}><GroupOverlayCustomElement {...options} /></Portal>;
    }

    const renderFrameCaptionBar = () => {
        const FrameCaptionBarCustomElement = components?.flat?.CaptionBar;
        return Object.values(state.frameCaptionBars).map((fcb) => {
            if (!FrameCaptionBarCustomElement || !fcb.parentElement) {
                return;
            }

            const { parentElement, ...options } = fcb;

            const feedback = {
                onClick: () => {
                    webGroupsManager.feedbackFrame(options.targetId);
                },
                ...options.feedback
            };

            const sticky = {
                onClick: () => {
                    webGroupsManager.stickyFrame(options.targetId);
                },
                ...options.sticky
            };

            const extract = {
                onClick: () => {
                    webGroupsManager.extractFrame(options.targetId);
                },
                ...options.extract
            };

            const lock = {
                onClick: () => {
                    webGroupsManager.lockFrame(options.targetId);
                },
                ...options.lock
            };

            const unlock = {
                onClick: () => {
                    webGroupsManager.unlockFrame(options.targetId);
                },
                ...options.unlock
            };

            const minimize = {
                onClick: () => {
                    webGroupsManager.minimizeFrame(options.targetId);
                },
                ...options.minimize
            }

            const restore = {
                onClick: () => {
                    webGroupsManager.restoreFrame(options.targetId);
                },
                ...options.restore
            }

            const maximize = {
                onClick: () => {
                    webGroupsManager.maximizeFrame(options.targetId);
                },
                ...options.maximize
            }

            const close = {
                onClick: () => {
                    webGroupsManager.closeFrame(options.targetId);
                },
                ...options.close
            }

            let customButtonsProps = new Array<CustomButtonProps>();
            if (options.customButtons) {
                customButtonsProps = options.customButtons.map((cButton) => {
                    return {
                        onClick: () => {
                            webGroupsManager.clickCustomButton(options.targetId, cButton.buttonId);
                        },
                        visible: true,
                        imageData: cButton.imageData,
                        tooltip: cButton.tooltip,
                        buttonId: cButton.buttonId
                    }
                });
            }

            const showSelector = (bounds: Bounds) => {
                webGroupsManager.onFrameChannelSelectorClick(options.targetId, bounds);
            }

            const channels = {
                showSelector,
                visible: options.channelSelectorVisible,
                selectedChannel: options.selectedChannel,
                selectedChannelColor: options.selectedChannelColor
            }

            const captionEditor = {
                ...options.captionEditor,
                commitChanges: (text: string) => {
                    webGroupsManager.commitCaptionEditing(TargetType.Frame, options.targetId, text);
                },
                hideEditor: () => {
                    webGroupsStore.onHideCaptionEditorRequested(TargetType.Frame, options.targetId);
                },
                notifyBoundsChanged: (bounds: Bounds) => {
                    webGroupsManager.onCaptionEditorBoundsChanged(TargetType.Frame, options.targetId, bounds);
                },
                notifyEditorVisibilityChanged: (visible: boolean) => {
                    webGroupsManager.onCaptionEditorVisibleChanged(TargetType.Frame, options.targetId, visible);
                }
            };

            const notifyCaptionBoundsChanged = (bounds: Bounds) => webGroupsManager.onCaptionTextBoundsChanged(TargetType.Frame, options.targetId, bounds);

            return <Portal key={options.targetId} parentElement={parentElement}>
                <FrameCaptionBarCustomElement {...options}
                    feedback={feedback}
                    sticky={sticky}
                    extract={extract}
                    lock={lock}
                    unlock={unlock}
                    minimize={minimize}
                    maximize={maximize}
                    restore={restore}
                    close={close}
                    channels={channels}
                    customButtons={customButtonsProps}
                    frameId={options.targetId}
                    captionEditor={captionEditor}
                    notifyCaptionBoundsChanged={notifyCaptionBoundsChanged} />
            </Portal>
        });
    }

    const renderFrameWindowOverlay = () => {
        const FrameWindowOverlayCustomElement = components?.frame?.Overlay;
        return Object.values(state.frameWindowOverlays).map((fcb) => {
            if (!FrameWindowOverlayCustomElement || !fcb.parentElement) {
                return;
            }

            const { parentElement, ...options } = fcb;

            return <Portal key={options.targetId} parentElement={parentElement}>
                <FrameWindowOverlayCustomElement {...options} frameId={options.targetId} />
            </Portal>
        });
    }

    const renderAboveWindow = () => {
        const AboveWindowCustomElement = components?.frame?.AboveWindow;
        return Object.values(state.aboveWindowZones).map((awz) => {
            if (!AboveWindowCustomElement || !awz.parentElement) {
                return;
            }
            const { parentElement, ...options } = awz;

            return <Portal key={options.targetId} parentElement={parentElement}>
                <AboveWindowCustomElement {...options} frameId={options.targetId} />
            </Portal>
        });
    }

    const renderWindowContentOverlays = () => {
        const WindowContentCustomElement = components?.frame?.WindowContentOverlay;
        return Object.values(state.windowContentOverlays).map((wco) => {
            if (!WindowContentCustomElement || !wco.parentElement) {
                return;
            }
            const { parentElement, ...options } = wco;

            return <Portal key={options.targetId} parentElement={parentElement}>
                <WindowContentCustomElement {...options} frameId={options.targetId} />
            </Portal>
        });
    }

    const renderFrameLoadingAnimations = () => {
        const LoadingAnimationCustomElement = components?.frame?.LoadingAnimation;
        return Object.values(state.frameLoadingAnimations).map((wla) => {
            if (!LoadingAnimationCustomElement || !wla.parentElement) {
                return;
            }
            const { parentElement, ...options } = wla;

            return <Portal key={options.targetId} parentElement={parentElement}>
                <LoadingAnimationCustomElement {...options} frameId={options.targetId} />
            </Portal>
        });
    }

    const renderBelowWindow = () => {
        const BelowWindowCustomElement = components?.frame?.BelowWindow;
        return Object.values(state.belowWindowZones).map((bwz) => {
            if (!BelowWindowCustomElement || !bwz.parentElement) {
                return;
            }
            const { parentElement, ...options } = bwz;

            return <Portal key={options.targetId} parentElement={parentElement}>
                <BelowWindowCustomElement {...options} frameId={options.targetId} />
            </Portal>
        });
    }

    const renderAboveTabs = () => {
        const AboveTabsCustomElement = components?.tabs?.Above;

        return Object.values(state.aboveTabsZones).map((te) => {
            if (!AboveTabsCustomElement || !te.parentElement) {
                return;
            }

            const { parentElement, ...options } = te;
            return <Portal key={options.targetId} parentElement={parentElement}><AboveTabsCustomElement {...options} frameId={options.targetId} /></Portal>
        });
    }

    const renderBeforeTabsZones = () => {
        const BeforeTabsCustomElement = components?.tabs?.Before;

        return Object.values(state.beforeTabsZones).map((te) => {
            if (!BeforeTabsCustomElement || !te.parentElement) {
                return;
            }

            const { parentElement, ...options } = te;
            return <Portal key={options.targetId} parentElement={parentElement}><BeforeTabsCustomElement {...options} frameId={options.targetId} /></Portal>
        });
    }

    const renderTabElements = () => {
        const TabCustomElement = components?.tabs?.Element;

        return Object.values(state.tabElements).map((te) => {
            if (!TabCustomElement || !te.parentElement) {
                return;
            }

            const { parentElement, ...options } = te;


            const onCloseClick = () => {
                webGroupsManager.closeTab(options.targetId);
            }

            const showSelector = (bounds: Bounds) => {
                webGroupsManager.onTabChannelSelectorClick(options.targetId, bounds);
            }

            const channels: ChannelProps = {
                showSelector,
                visible: options.channelSelectorVisible,
                selectedChannel: options.selectedChannel,
                selectedChannelColor: options.selectedChannelColor ?? options.selectedChannel // TODO remove the null check when the variable has been added
            };

            const captionEditor = {
                ...options.captionEditor,
                commitChanges: (text: string) => {
                    webGroupsManager.commitCaptionEditing(TargetType.Tab, options.targetId, text);
                },
                hideEditor: () => {
                    webGroupsStore.onHideCaptionEditorRequested(TargetType.Tab, options.targetId);
                },
                notifyBoundsChanged: (bounds: Bounds) => {
                    webGroupsManager.onCaptionEditorBoundsChanged(TargetType.Tab, options.targetId, bounds);
                },
                notifyEditorVisibilityChanged: (visible: boolean) => {
                    webGroupsManager.onCaptionEditorVisibleChanged(TargetType.Tab, options.targetId, visible);
                }
            };

            const notifyCaptionBoundsChanged = (bounds: Bounds) => webGroupsManager.onCaptionTextBoundsChanged(TargetType.Tab, options.targetId, bounds);

            return <Portal key={options.targetId} parentElement={parentElement}>
                <TabCustomElement {...options}
                    close={onCloseClick}
                    channels={channels}
                    windowId={options.targetId}
                    captionEditor={captionEditor}
                    notifyCaptionBoundsChanged={notifyCaptionBoundsChanged}
                />
            </Portal>
        });
    }

    const renderAfterTabsZones = () => {
        const AfterTabsCustomElement = components?.tabs?.After;

        return Object.values(state.afterTabsZones).map((te) => {
            if (!AfterTabsCustomElement || !te.parentElement) {
                return;
            }

            const { parentElement, ...options } = te;
            return <Portal key={options.targetId} parentElement={parentElement}><AfterTabsCustomElement {...options} frameId={options.targetId} /></Portal>
        });
    }

    const renderTabHeaderButtons = () => {
        const TabButtonsCustomElement = components?.tabs?.Buttons;

        return Object.values(state.tabHeaderButtons).map((te) => {
            if (!TabButtonsCustomElement || !te.parentElement) {
                return;
            }
            const { parentElement, ...options } = te;

            const feedback = {
                onClick: () => {
                    webGroupsManager.feedbackTabBar(options.targetId);
                },
                ...options.feedback
            };

            const sticky = {
                onClick: () => {
                    webGroupsManager.stickyTabBar(options.targetId);
                },
                ...options.sticky
            };

            const extract = {
                onClick: () => {
                    webGroupsManager.extractTabBar(options.targetId);
                },
                ...options.extract
            };

            const lock = {
                onClick: () => {
                    webGroupsManager.lockTabBar(options.targetId);
                },
                ...options.lock
            }

            const unlock = {
                onClick: () => {
                    webGroupsManager.unlockTabBar(options.targetId);
                },
                ...options.unlock
            }

            const minimize = {
                onClick: () => {
                    webGroupsManager.minimizeTabBar(options.targetId);
                },
                ...options.minimize
            }

            const restore = {
                onClick: () => {
                    webGroupsManager.restoreTabBar(options.targetId);
                },
                ...options.restore
            }

            const maximize = {
                onClick: () => {
                    webGroupsManager.maximizeTabBar(options.targetId);
                },
                ...options.maximize
            }

            const close = {
                onClick: () => {
                    webGroupsManager.closeTabBar(options.targetId);
                },
                ...options.close
            }

            let customButtonsProps = new Array<CustomButtonProps>();
            if (options.customButtons) {
                customButtonsProps = options.customButtons.map((cButton) => {
                    return {
                        onClick: () => {
                            webGroupsManager.clickCustomButton(options.targetId, cButton.buttonId);
                        },
                        visible: true,
                        imageData: cButton.imageData,
                        tooltip: cButton.tooltip,
                        buttonId: cButton.buttonId
                    }
                });
            }

            return <Portal key={options.targetId} parentElement={parentElement}><TabButtonsCustomElement {...options}
                feedback={feedback}
                sticky={sticky}
                extract={extract}
                lock={lock}
                unlock={unlock}
                minimize={minimize}
                maximize={maximize}
                restore={restore}
                close={close}
                customButtons={customButtonsProps}
                frameId={options.targetId}
            /></Portal>
        });
    }

    const renderBelowTabs = () => {
        const BelowTabsCustomElement = components?.tabs?.Below;

        return Object.values(state.belowTabsZones).map((te) => {
            if (!BelowTabsCustomElement || !te.parentElement) {
                return;
            }

            const { parentElement, ...options } = te;
            return <Portal key={options.targetId} parentElement={parentElement}><BelowTabsCustomElement {...options} frameId={options.targetId} /></Portal>
        });
    }

    return <>
        {renderGroupCaptionBar()}
        {renderGroupOverlay()}
        {renderFrameCaptionBar()}
        {renderFrameWindowOverlay()}
        {renderAboveWindow()}
        {renderWindowContentOverlays()}
        {renderFrameLoadingAnimations()}
        {renderBelowWindow()}
        {renderAboveTabs()}
        {renderBeforeTabsZones()}
        {renderTabElements()}
        {renderAfterTabsZones()}
        {renderTabHeaderButtons()}
        {renderBelowTabs()}
        <GroupWrapper
            onCreateGroupCaptionBarRequested={components?.group?.CaptionBar ? webGroupsStore.onCreateGroupCaptionBarRequested : undefined}
            onCreateGroupOverlayRequested={components?.group?.Overlay ? webGroupsStore.onCreateGroupOverlayRequested : undefined}
            onCreateFrameCaptionBarRequested={components?.flat?.CaptionBar ? webGroupsStore.onCreateFrameCaptionBarRequested : undefined}
            onCreateFrameWindowOverlayRequested={components?.frame?.Overlay ? webGroupsStore.onCreateFrameWindowOverlayRequested : undefined}
            onCreateAboveWindowRequested={components?.frame?.AboveWindow ? webGroupsStore.onCreateAboveWindowRequested : undefined}
            onCreateWindowContentOverlayRequested={components?.frame?.WindowContentOverlay ? webGroupsStore.onCreateWindowContentOverlayRequested : undefined}
            onCreateFrameLoadingAnimationRequested={components?.frame?.LoadingAnimation ? webGroupsStore.onCreateFrameLoadingAnimationRequested : undefined}
            onCreateBelowWindowRequested={components?.frame?.BelowWindow ? webGroupsStore.onCreateBelowWindowRequested : undefined}
            onCreateAboveTabsRequested={components?.tabs?.Above ? webGroupsStore.onCreateAboveTabsComponentRequested : undefined}
            onCreateBeforeTabsComponentRequested={components?.tabs?.Before ? webGroupsStore.onCreateBeforeTabsComponentRequested : undefined}
            onCreateTabRequested={components?.tabs?.Element ? webGroupsStore.onCreateTabElementRequested : undefined}
            onCreateAfterTabsComponentRequested={components?.tabs?.After ? webGroupsStore.onCreateAfterTabsComponentRequested : undefined}
            onCreateTabHeaderButtonsRequested={components?.tabs?.Buttons ? webGroupsStore.onCreateTabHeaderButtonsRequested : undefined}
            onCreateBelowTabsRequested={components?.tabs?.Below ? webGroupsStore.onCreateBelowTabsComponentRequested : undefined}
            onUpdateGroupCaptionBarRequested={components?.group?.CaptionBar ? webGroupsStore.onUpdateGroupCaptionBarRequested : undefined}
            onUpdateFrameWindowOverlayRequested={components?.group?.Overlay ? webGroupsStore.onUpdateFrameWindowOverlayRequested : undefined}
            onUpdateFrameCaptionBarRequested={components?.flat?.CaptionBar ? webGroupsStore.onUpdateFrameCaptionBarRequested : undefined}
            onUpdateFrameRequested={webGroupsStore.onUpdateFrame}
            onUpdateStandardButtonRequested={webGroupsStore.onUpdateStandardButton}
            onUpdateCustomButtonsRequested={webGroupsStore.onUpdateCustomButtons}
            onUpdateAboveTabsRequested={components?.tabs?.Above ? webGroupsStore.onUpdateAboveTabsRequested : undefined}
            onUpdateBeforeTabsComponentRequested={components?.tabs?.Before ? webGroupsStore.onUpdateBeforeTabsRequested : undefined}
            onUpdateTabRequested={components?.tabs?.Element ? webGroupsStore.onUpdateTabElementRequested : undefined}
            onUpdateAfterTabsComponentRequested={components?.tabs?.After ? webGroupsStore.onUpdateAfterTabsRequested : undefined}
            onUpdateBelowTabsRequested={components?.tabs?.Below ? webGroupsStore.onUpdateBelowTabsRequested : undefined}
            onRemoveFrameCaptionBarRequested={webGroupsStore.onRemoveFrameCaptionBarRequested}
            onRemoveFrameWindowOverlayRequested={webGroupsStore.onRemoveFrameWindowOverlayRequested}
            onRemoveAboveWindowRequested={webGroupsStore.onRemoveAboveWindowRequested}
            onRemoveWindowContentOverlayRequested={webGroupsStore.onRemoveWindowContentOverlayRequested}
            onRemoveFrameLoadingAnimationRequested={webGroupsStore.onRemoveFrameLoadingAnimationRequested}
            onRemoveBelowWindowRequested={webGroupsStore.onRemoveBelowWindowRequested}
            onRemoveAboveTabsRequested={webGroupsStore.onRemoveAboveTabsRequested}
            onRemoveBeforeTabsComponentRequested={webGroupsStore.onRemoveBeforeTabsComponentRequested}
            onRemoveTabRequested={webGroupsStore.onRemoveTabElementRequested}
            onRemoveAfterTabsComponentRequested={webGroupsStore.onRemoveAfterTabsComponentRequested}
            onRemoveTabHeaderButtonsRequested={webGroupsStore.onRemoveTabHeaderButtonsRequested}
            onRemoveBelowTabsRequested={webGroupsStore.onRemoveBelowTabsRequested}
            onShowCaptionEditorRequested={webGroupsStore.onShowCaptionEditorRequested}
            onCommitCaptionEditingRequested={webGroupsStore.onCommitCaptionEditingRequested}
            onHideCaptionEditorRequested={webGroupsStore.onHideCaptionEditorRequested}
            onShowLoadingAnimationRequested={webGroupsStore.onShowLoadingAnimationRequested}
            onHideLoadingAnimationRequested={webGroupsStore.onHideLoadingAnimationRequested}
            styles={styles}
        />
    </>
}

export default GroupElementCreationWrapper;