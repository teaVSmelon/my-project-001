import { Handlers, PageProps } from "$fresh/server.ts";
import { User, UserData } from "../../utils/data.tsx";
import { GetData, UpdateData } from "../../utils/db.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import EditValueInput from "../../islands/EditValueInput.tsx";
import EditSaveButton from "../../islands/EditSaveButton.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const user_id = ctx.params.user_id;
    const user_kv = await GetData(["users", user_id]);

    return await ctx.render({
      UserID: user_id,
      UserData: user_kv.value as UserData,
    });
  },
  async POST(req, ctx) {
    const new_user_data = await req.json();
    if (!new_user_data) return new Response(JSON.stringify({"Error": "Not Json Data."}), {status: 400});

    const user_id = ctx.params.user_id;
    const user_kv = await GetData(["users", user_id]);
    if (!user_kv.value) return new Response(JSON.stringify({"Error": "No User from UserID."}), {status: 400});

    await UpdateData(["users", user_id], ["users", new_user_data.user_id], new_user_data);

    return new Response(JSON.stringify({
      "Success": true
    }), {status: 200});
  },
};

export default function Edit(props: PageProps) {
  const { UserID, UserData } = props.data;

  if (UserData) {
    return (
      <div>
        <EditValueInput title={"User ID"} description={"..."} text={UserData.user_id} data_key={User.UserID} user_data={UserData} />
        <EditValueInput
          title={"User Name"}
          description={"..."}
          text={UserData.user_name}
          data_key={User.UserName} user_data={UserData}
        />
        <EditValueInput
          title={"User Password"}
          description={"..."}
          text={UserData.user_password}
          data_key={User.UserPassword} user_data={UserData}
        />
        <EditValueInput title={"Money"} description={"..."} text={UserData.money.toString()} data_key={User.Money} user_data={UserData} />
        <div class={"flex"}>
          <EditSaveButton user_data={UserData} />
        </div>
      </div>
    );
  } else {
    return <p>No User from ID: {UserID}</p>;
  }
}
