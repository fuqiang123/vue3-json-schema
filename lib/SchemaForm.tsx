import { defineComponent, PropType, provide } from "vue";
import { Schema, Theme } from "./types";
import SchemaItem from "./SchemaItem";
import { SchemaFormContextKey } from "./context";
export default defineComponent({
  name: "SchemaForm",
  props: {
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
    }
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true
    // }
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v);
    };
    const context = {
      SchemaItem
      // theme: props.theme
    };
    provide(SchemaFormContextKey, context);

    return () => {
      const { schema, value } = props;
      return (
        <SchemaItem
          rootSchema={schema}
          schema={schema}
          value={value}
          onChange={handleChange}
        />
      );
    };
  }
});
