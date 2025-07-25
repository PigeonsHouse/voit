export interface ColoredObject {
  /**
   * オブジェクトの色
   */
  color: string;
}

export const constructColoredObject = (
  object: ColoredObject,
  color: string,
): ColoredObject => {
  return {
    ...object,
    color,
  };
};

export function isColoredObject(obj: any): obj is ColoredObject {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "color" in obj &&
    typeof obj.color === "string"
  );
}
