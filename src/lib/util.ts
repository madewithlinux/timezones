import { isNil } from "lodash";

export function numberOrNil(num: number | string | undefined | null) {
  if (isNil(num)) {
    return num
  }
  return Number(num)
}
