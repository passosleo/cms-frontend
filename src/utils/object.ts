type ObjectRecursiveOf<T> = { [key: string]: ObjectRecursiveOf<T> | T };

export function iterateObject<T = string>(
  mapOfIndexes: string[],
  objectOfString: ObjectRecursiveOf<T>
): T | undefined {
  if (objectOfString[mapOfIndexes[0]] === undefined) {
    return undefined;
  }

  if (mapOfIndexes.length <= 1) {
    return objectOfString[mapOfIndexes[0]] as T;
  }

  const newMap = mapOfIndexes.splice(1);
  return iterateObject(
    newMap,
    objectOfString[mapOfIndexes[0]] as ObjectRecursiveOf<T>
  );
}

export function replaceBlankFields(
  data: Record<string, any>,
  criteria = "",
  replaceValue = null
) {
  const normalizedData = { ...data };
  Object.keys(normalizedData).forEach((key) => {
    if (normalizedData[key] === criteria) {
      normalizedData[key] = replaceValue;
    }
  });

  return normalizedData;
}

export function removeInvalidFields(
  data: Record<string, any>,
  invalidCriteria = [null, undefined, ""]
) {
  const normalizedData = { ...data };
  Object.keys(normalizedData).forEach((key) => {
    if (invalidCriteria.includes(normalizedData[key])) {
      delete normalizedData[key];
    }
  });

  return normalizedData;
}
