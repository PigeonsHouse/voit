export interface ResourceObject {
  /**
   * ファイルのフルパス
   */
  filePath: string;
}

export function isResourceObject(
  obj: any
): obj is ResourceObject {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "filePath" in obj && typeof obj.filePath === "string"
  );
}
