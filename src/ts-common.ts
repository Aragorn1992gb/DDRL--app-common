export function responsiveResize(elemId: string, screenId?: string): string[] {
    const h = document.getElementById(elemId)?.offsetHeight || 0;
    const w = document.getElementById(elemId)?.offsetWidth || 0;
    const hs = screenId ? document.getElementById(screenId)?.offsetHeight || 0 : window.innerHeight;
    const ws = screenId ? document.getElementById(screenId)?.offsetWidth || 0 : window.innerWidth;

    const dim: string[] = [];
    const perc = (100 * w) / h;
    const percs = (100 * ws) / hs;

    if (percs < perc) {
        dim[0] = "auto";
        dim[1] = `${ws}px`;
    } else {
        dim[0] = `${hs}px`;
        dim[1] = "auto";
    }
    return dim;
}

export function responsiveCenter(elemId: string, screenId?: string): string {
    const h = document.getElementById(elemId)?.offsetHeight || 0;
    const w = document.getElementById(elemId)?.offsetWidth || 0;
    const hs = screenId ? document.getElementById(screenId)?.offsetHeight || 0 : window.innerHeight;
    const ws = screenId ? document.getElementById(screenId)?.offsetWidth || 0 : window.innerWidth;

    const pt = (hs - h) / 2;
    const pl = (ws - w) / 2;
    return `${pt}px 0px 0px ${pl}px`;
}

export function responsiveInput(initialNumbers: number, initialWidth: number, currentNumbers: number, minWidth: number): number {
    let newSize = initialWidth;
    if (currentNumbers > initialNumbers) {
        const deltaSize = minWidth / initialNumbers;
        newSize = deltaSize * currentNumbers;
    } else if (currentNumbers === initialNumbers) {
        newSize = 0;
    }
    return newSize;
}

export function fontSizer(
    elemId: string,
    minimumFontSize: number = 0,
    lowerFontSize: number = 0,
    interspace: number = 25
  ): number {
    try {
      const inputElement = document.getElementById(elemId) as HTMLInputElement;

      if (inputElement) {
        const elWidth = inputElement.offsetWidth ?? 0;
        const text = inputElement.value;

        const computedStyle = window.getComputedStyle(inputElement);

        if (minimumFontSize == 0) {
          minimumFontSize = parseFloat(computedStyle.fontSize || "12");
        }

        const fontFamily = computedStyle.fontFamily || "arial";
        const fontWeight = computedStyle.fontWeight || "400";
        const textWidth = getTextWidth(
          text,
          minimumFontSize,
          fontFamily,
          fontWeight
        );

        let newFontSize: number;
        if (elWidth - interspace < textWidth) {
          newFontSize = (minimumFontSize * (elWidth - interspace)) / textWidth;
        } else {
          newFontSize = minimumFontSize;
        }

        newFontSize =
          lowerFontSize > 0 && newFontSize < lowerFontSize
            ? lowerFontSize
            : newFontSize;

        inputElement.style.fontSize = `${newFontSize}px`;
        return 0;
      } else {
        console.warn(`Element with id ${elemId} not found.`);
        return 1;
      }
    } catch (error) {
      console.error(`An error occurred in fontSizer: ${error}`);
      return -1;
    }
  }

// Helper function to calculate text width (needs to be implemented)
export function getTextWidth(text: string, fontSize: number, fontFamily: string, fontWeight: string): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return 0; // Return 0 if context is not available

    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    return context.measureText(text).width;
}
