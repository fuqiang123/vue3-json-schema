import { PropType, DefineComponent } from "vue";
// 枚举类型
export enum SchemaTypes {
  "NUMBER" = "number",
  "INTEGER" = "integer",
  "STRING" = "string",
  "OBJECT" = "object",
  "ARRAY" = "array",
  "BOOLEAN" = "boolean"
}
type SchemaRef = { $ref: string };
// Schema接口
export interface Schema {
  type?: SchemaTypes | string;
  const?: any;
  format?: string;

  title?: string;
  default?: any;

  properties?: {
    [key: string]: Schema;
  };
  items?: Schema | Schema[] | SchemaRef;
  uniqueItems?: any;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
  vjsf?: [];
  required?: string[];
  enum?: any[];
  enumNames?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true
  }
} as const; // 必须声明为const只读 这样required属性值才会生效 也就是必填项

// 定义组件
export type CommonFieldType = DefineComponent<typeof FieldPropsDefine>;

const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  }
} as const;
const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<
      {
        key: string;
        value: any;
      }[]
    >,
    required: true
  }
};
type CommonWidgetDefine = DefineComponent<typeof CommonWidgetPropsDefine>;

type SelectionWidgetDefine = DefineComponent<typeof SelectionWidgetPropsDefine>;
export interface Theme {
  widgets: {
    SelectionWidget: SelectionWidgetDefine;
    TextWidget: CommonWidgetDefine;
    NumberWidget: CommonWidgetDefine;
  };
}
