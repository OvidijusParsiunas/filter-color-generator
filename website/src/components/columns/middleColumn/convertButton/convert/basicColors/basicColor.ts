import { ConversionResult, ColorConversionTypes } from '../../../../../../shared/types/basicColorFactory';
import { UNEXPECTED_ERROR_MESSAGE_PREFIX } from 'css-filter-converter/lib/shared/consts/errors';
import { ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { ErrorHandling } from 'css-filter-converter/lib/shared/errorHandling/errorHandling';
import { UnexpectedError } from 'css-filter-converter/lib/shared/types/unexpectedError';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { Error } from 'css-filter-converter/lib/shared/types/error';

export abstract class BasicColor {
  public abstract colorType: BasicColorTypes;

  public abstract defaultColorString: string;

  // WORK - create getter for this so that colorString would not be directly overwritten
  public abstract colorString: string;

  public abstract parseResult: ColorConversionTypes | null;

  protected abstract parse(): ParseResult<ColorConversionTypes>;

  protected abstract convert(newColorType: BasicColorTypes): ConversionResult;

  protected abstract formatResult(conversionResult: ColorConversionTypes): string;

  public setAndParseColorString(colorString: string): void {
    this.colorString = colorString;
    const parseResult = this.parse();
    this.parseResult = ErrorHandling.hasError(parseResult) ? null : parseResult.color;
  }

  private static generateUnexpectedError(error: UnexpectedError): Error {
    const errorMessage = `${UNEXPECTED_ERROR_MESSAGE_PREFIX}: \n${error.message}`;
    console.log(errorMessage);
    return { errorMessage };
  }

  private setPostConversionResult(conversionResult: ColorConversionTypes): void {
    const formattedString = this.formatResult(conversionResult);
    this.setAndParseColorString(formattedString);
  }

  public convertAndSetColorStringOnNewBasicColor(newColor: BasicColor): void {
    try {
      let wasColorStringSet = false;
      if (this.parseResult) {
        const conversionResult = this.convert(newColor.colorType);
        if (conversionResult) {
          newColor.setPostConversionResult(conversionResult);
          wasColorStringSet = true;
        }
      }
      if (!wasColorStringSet) newColor.setAndParseColorString(newColor.defaultColorString);
    } catch (error) {
      // should throw here and error should be caught in the ui
      BasicColor.generateUnexpectedError(error as UnexpectedError);
    }
  }
}
