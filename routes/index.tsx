import { Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact";
import { ulid } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { UserData } from "../utils/data.tsx";
import { AddData, DeleteAllData, GetAllData } from "../utils/db.tsx";
import DeleteButton from "../islands/DeleteButton.tsx";
import EditButton from "../islands/EditButton.tsx";
import AddButton from "../islands/AddButton.tsx";

const class_table_border = "px-2 py-2 bg-white border(gray-600 2)";

async function ResetData() {
  await DeleteAllData(["users"]);
  for (let i = 0; i < 10; i++) {
    const user_data: UserData = {
      user_id: ulid(),
      user_name: ulid().substring(10, 15),
      user_password: ulid().substring(10, 17),
      money: 100,
    };
    await AddData(["users", user_data.user_id], user_data);
  }
}

export const handler: Handlers = {
  async GET(req, ctx) {
    //await ResetData();

    return await ctx.render({
      ListUserData: await GetAllData(["users"]),
    });
  },
};

export default function Index(props: PageProps) {
  const { ListUserData } = props.data;
  const ListHTMLUserData: JSX.Element[] = [];

  for (const user_data of ListUserData) {
    ListHTMLUserData.push(
      (
        <tr class={class_table_border}>
          <td class={class_table_border}>{user_data.user_id}</td>
          <td class={class_table_border}>{user_data.user_name}</td>
          <td class={class_table_border}>{user_data.user_password}</td>
          <td class={class_table_border}>{user_data.money}</td>
          <td class={class_table_border}>
            <DeleteButton user_id={user_data.user_id} />
          </td>
          <td class={class_table_border}>
            <EditButton user_id={user_data.user_id} />
          </td>
        </tr>
      ),
    );
  }

  return (
    <div>
      <table class={class_table_border}>
        <tr class={class_table_border}>
          <th class={class_table_border}>ID</th>
          <th class={class_table_border}>User Name</th>
          <th class={class_table_border}>User Password</th>
          <th class={class_table_border}>Money</th>
          <th class={class_table_border}>Delete</th>
          <th class={class_table_border}>Edit</th>
        </tr>
        {ListHTMLUserData}
      </table>
      <AddButton/>
    </div>
  );
}
