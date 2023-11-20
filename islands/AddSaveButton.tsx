import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

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
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={"px-2 py-2 bg-green-500 text-white border(green-600 2) rounded-md font-bold hover:bg-green-400 active:bg-green-300 disabled:(opacity-50 cursor-not-allowed"}
    />
  );
}
interface UserData {
  user_id: string;
  user_name: string;
  user_password: string;
  money: number;
}

export default function AddSaveButton(user_kv: { user_data: UserData }) {
  const onClickHandler = async () => {
    const response = await fetch(location.href, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user_kv.user_data),
    });

    if (response.ok) {
      location.assign("/");
    }
    else{
      console.error(await response.json());
    }
  };

  return <Button onClickHandler={onClickHandler}>Add</Button>;
}
