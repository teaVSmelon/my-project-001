import { Handlers, PageProps } from "$fresh/server.ts";
import { ulid } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { User, UserData } from "../utils/data.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { AddData } from "../utils/db.tsx";
import AddValueInput from "../islands/AddValueInput.tsx";
import AddSaveButton from "../islands/AddSaveButton.tsx";

export const handler: Handlers = {
  async POST(req, ctx) {
    const user_data = await req.json();

    for (const [_, value] of Object.entries(user_data)) {
      if (typeof value == "string" && (value as string).trim() == "") {
        return new Response(
          JSON.stringify({ "Error": "User Data not complete." }),
          { status: 400 },
        );
      }
    }

    await AddData(["users", user_data.user_id], user_data);

    return new Response(JSON.stringify({}), { status: 200 });
  },
};

export default function Add() {
  const UserData: UserData = {
    user_id: ulid(),
    user_name: "",
    user_password: "",
    money: 0,
  };

  return (
    <div>
      <AddValueInput
        title={"User ID"}
        description={"..."}
        text={UserData.user_id}
        data_key={User.UserID}
        user_data={UserData}
      />
      <AddValueInput
        title={"User Name"}
        description={"..."}
        text={UserData.user_name}
        data_key={User.UserName}
        user_data={UserData}
      />
      <AddValueInput
        title={"User Password"}
        description={"..."}
        text={UserData.user_password}
        data_key={User.UserPassword}
        user_data={UserData}
      />
      <AddValueInput
        title={"Money"}
        description={"..."}
        text={UserData.money.toString()}
        data_key={User.Money}
        user_data={UserData}
      />
      <div class={"flex"}>
        <AddSaveButton user_data={UserData} />
      </div>
    </div>
  );
}
