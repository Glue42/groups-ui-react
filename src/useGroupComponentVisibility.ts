import { useSyncExternalStore } from "use-sync-external-store/shim";
import { ElementCreationWrapperState, GroupComponentVisibilityState } from "./types/internal";
import webGroupsStore from "./webGroupsStore";

function useGroupComponentVisibility(): GroupComponentVisibilityState {
    const state = useSyncExternalStore<ElementCreationWrapperState>(webGroupsStore.subscribe, webGroupsStore.getSnapshot);
    return {
        groupCaptionBarVisible: state.groupCaptionBar?.visible
    };
}

export default useGroupComponentVisibility;

