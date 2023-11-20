import { Handlers, PageProps } from "$fresh/server.ts";
import { DeleteData } from "../../utils/db.tsx";

export const handler: Handlers = {
    async POST(req, ctx) {
      const old_url = req.headers.get("referer");
      if (!old_url) return await ctx.renderNotFound();
      const user_id = ctx.params.user_id;

      await DeleteData(["users", user_id]);

      return new Response(JSON.stringify({
        "Success": true
      }));
    }
};
