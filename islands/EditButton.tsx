import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface UserEditData {
    user_id: string;
}

interface FunctionProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  onClickHandler?: () => void;
}

function Button(props: FunctionProps) {
  if (IS_BROWSER) {
    props.onClick = () => {
      if (props.onClickHandler) {
        props.onClickHandler();
      }
    };
  }
  return <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={"px-2 py-2 bg-blue-500 text-white border(blue-600 2) rounded-md font-bold hover:bg-blue-400 active:bg-blue-300 disabled:(opacity-50 cursor-not-allowed"}
    />;
}

export default function EditButton(user_edit_data: UserEditData) {
  const onClickHandler = () => {
    location.assign("/Edit/" + user_edit_data.user_id);
  };

  return <Button onClickHandler={onClickHandler} >Edit</Button>;
}
