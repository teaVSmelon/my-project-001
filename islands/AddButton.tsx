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
  return <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={"px-2 py-2 bg-gray-500 text-white border(gray-600 2) rounded-md font-bold hover:bg-gray-400 active:bg-gray-300 disabled:(opacity-50 cursor-not-allowed"}
    />;
}

export default function AddButton() {
  const onClickHandler = () => {
    location.assign("/add");
  };

  return <Button onClickHandler={onClickHandler} >Add</Button>;
}
