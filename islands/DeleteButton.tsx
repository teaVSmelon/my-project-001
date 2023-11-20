import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface UserDeleteData {
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
      class={"px-2 py-2 bg-red-500 text-white border(red-600 2) rounded-md font-bold hover:bg-red-400 active:bg-red-300 disabled:(opacity-50 cursor-not-allowed"}
    />;
}

export default function DeleteButton(user_delete_data: UserDeleteData) {
  const onClickHandler = async () => {
    const response = await fetch("/Delete/" + user_delete_data.user_id, {
      method: "POST",
    });

    if (response.ok) {
      location.reload();
    }
  };

  return <Button onClickHandler={onClickHandler}>Delete</Button>;
}
