import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { User, UserData } from "../utils/data.tsx";

interface ValueData {
  title?: string;
  description: string;
  text: string;
  user_data: UserData;
  data_key: User;
}

interface TitleData extends JSX.HTMLAttributes<HTMLParagraphElement> {
  title?: string;
}

interface InputData extends JSX.HTMLAttributes<HTMLInputElement> {
  description: string;
  text: string;
  can_readonly: boolean;
  onInputHandler?: (event: Event) => void;
}

function Title(props: TitleData) {
  if (!props.title) return null;
  return (
    <p
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={"px-3 py-2 w-100 mt-auto mb-auto text-lg"}
    />
  );
}

function Input(props: InputData) {
  props.placeholder = props.description;
  props.value = props.text;
  props.onInput = props.onInputHandler;
  return (
    <input
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      readOnly={props.can_readonly}
      class={"px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed)"}
    />
  );
}

export default function AddValueInput(value_data: ValueData) {
  const data_key: keyof (UserData) = value_data.data_key;
  const user_data = value_data.user_data;
  const onInputHandler = (event: Event) => {
    const input_value = (event.target as HTMLInputElement).value;
    switch (data_key) {
      case User.UserID:
        user_data[User.UserID] = input_value;
        break;
      case User.UserName:
        user_data[User.UserName] = input_value;
        break;
      case User.UserPassword:
        user_data[User.UserPassword] = input_value;
        break;
      case User.Money:
        if (parseFloat(input_value)) {
          user_data[User.Money] = parseFloat(input_value);
        }
        break;
    }
    console.log(user_data);
  };

  return (
    <div class={"flex"}>
      <Title title={value_data.title}>
        {value_data.title ? value_data.title : undefined}
      </Title>
      <Input
        description={value_data.description}
        text={value_data.text}
        onInputHandler={onInputHandler}
        can_readonly={data_key == User.UserID}
      />
    </div>
  );
}
