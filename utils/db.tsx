import { UserData } from "./data.tsx";

const kv = await Deno.openKv();

export async function GetData(key: Deno.KvKey): Promise<Deno.KvEntryMaybe<unknown>> {
    return await kv.get(key);
}

export async function GetAllData(key: Deno.KvKey): Promise<UserData[]> {
    const datas = await kv.list({ prefix: key });
    const ListUserData: UserData[] = [];

    for await (const data of datas) {
      ListUserData.push(data.value as UserData);
    }

    return ListUserData;
}

export async function DeleteAllData(key: Deno.KvKey) {
  const datas = await kv.list({ prefix: key });

  for await (const data of datas) {
    await kv.delete(data.key);
  }
}

export async function AddData(key: Deno.KvKey, value: unknown)  {
    await kv.set(key, value);
}

export async function DeleteData(key: Deno.KvKey)  {
  const data = await GetData(key);
  await kv.atomic()
  .check(data)
  .delete(key)
  .commit();
}


export async function UpdateData(key: Deno.KvKey, new_key: Deno.KvKey, new_value: unknown)  {
  await DeleteData(key);
  await AddData(new_key, new_value);
}
