export interface ResourceObject {
  /**
   * ファイルのフルパス
   */
  filePath: string;
}

export const constructResourceObject = (
  object: ResourceObject,
  filePath: string,
): ResourceObject => {
  return {
    ...object,
    filePath,
  };
};

export function isResourceObject(obj: any): obj is ResourceObject {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "filePath" in obj &&
    typeof obj.filePath === "string"
  );
}
