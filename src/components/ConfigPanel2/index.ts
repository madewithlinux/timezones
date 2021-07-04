import { get, set } from "lodash";

export interface BaseField<V = any> {
  type: "Field" | string;
  path: string;
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
}

export interface NumberField extends BaseField<number> {
  type: "NumberField";
}
export interface StringField extends BaseField<string> {
  type: "StringField";
}
export interface SelectField<T> extends BaseField<T> {
  type: "SelectField";
  options: T[];
}

export class Config<Cfg extends { [path: string]: BaseField } = {}> {
  readonly cfg: Cfg;

  constructor(cfg: Cfg) {
    this.cfg = cfg;
  }

  static base(): Config<{}> {
    return new Config({});
  }

  number<P extends string & keyof any>(
    path: P,
    opts?: Partial<NumberField>
  ): Config<Cfg & { [p in P]: NumberField }> {
    return new Config({
      [path]: {
        type: "NumberField" as const,
        path,
        ...opts,
      },
      ...this.cfg,
    });
  }

  string<P extends string & keyof any>(
    path: P,
    opts?: Partial<StringField>
  ): Config<Cfg & { [p in P]: StringField }> {
    return new Config({
      [path]: {
        type: "StringField" as const,
        path,
        ...opts,
      },
      ...this.cfg,
    });
  }

  select<T, P extends string & keyof any>(
    path: P,
    options: T[],
    opts?: Partial<SelectField<T>>
  ): Config<Cfg & { [p in P]: SelectField<T> }> {
    return new Config({
      [path]: {
        type: "SelectField" as const,
        path,
        options,
        ...opts,
      },
      ...this.cfg,
    });
  }
}

function test() {
  const cfg = Config.base()
    .number("count")
    .number("barStartHour")
    .number("barEndHour")
    .select("localTimeZone", []);
}


