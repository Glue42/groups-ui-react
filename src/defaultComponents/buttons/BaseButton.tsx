import React from "react";
import { BaseButtonProps } from "../../types/defaultComponents";
import webGroupsManager from "../../webGroupsManager";

const BaseButton: React.FC<BaseButtonProps> = ({ outerElement, innerElement }) => {
    return <li {...outerElement} data-testid="outer-element" className={`${webGroupsManager.skipFocusStyle} ${outerElement.className}`}>
        <div {...innerElement}>
        </div>
    </li>
}

export default BaseButton;