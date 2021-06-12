import { getTimeZones, rawTimeZones, TimeZone, timeZonesNames } from "@vvo/tzdb";
import { isNil } from "lodash";
import { DateTime } from "luxon";

export const timeZones = getTimeZones()

export const toCanonicalTimeZoneName = (term: string) => {
  const mightBeBogus = DateTime.local().setZone(term);
  if (mightBeBogus.isValid) {
    return term;
  } else {
    console.log(term, mightBeBogus.isValid, mightBeBogus.invalidReason)
  }


  const preds: Array<(tz: TimeZone) => boolean> = [
    tz => term === tz.name,
    tz => term === tz.alternativeName,
    tz => tz.mainCities.findIndex(city => city === term) !== -1,
  ]

  for (const pred of preds) {
    const tz = timeZones.find(pred)
    if (!isNil(tz)) {
      return tz.name
    }
  }
  return undefined
}


// const value = timeZones.find((timeZone) => {
//   return dbData.timeZone === timeZone.name || timeZone.group.includes(dbData.timeZone);
// });
