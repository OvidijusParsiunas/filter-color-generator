import { InputTypes } from '../../../../shared/consts/inputTypes';

export class IconModePanelUtils {
  // please note that display is also controlled by the @media (max-height: 380px), (max-width: 920px) query
  // in the IconModePanel.css file which hides the panel when the screen is too small
  public static isIsDisplayed(activeInputType: InputTypes): boolean {
    return activeInputType === InputTypes.BASIC_COLOR;
  }
}