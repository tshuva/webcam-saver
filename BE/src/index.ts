import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from '@elysiajs/static'
import { join } from "node:path";

const app = new Elysia()
  .use(staticPlugin())
  .state('currentFrame', 1)
  .state('currentFolderPath', "public/")
  .state('save', false)
  .use(cors({ methods: ["PATCH", "GET", 'POST'] }
  ))
  /**quick patch - didn't work with cors properly */
  .guard({
    beforeHandle({ set, request: { headers } }) {
      if (headers.get('origin') !== `http://${process.env.CLIENT}`) {
        set.status = 401
        return 'Unauthorized'
      }
    }
  }, (app) => app
    .get("/frame/:path", ({ params: { path } }) => Bun.file(path))
    .post("/frame/:save/:format"
      , async ({ body, store, params: { save, format } }) => {
        const currentFrame = store.currentFrame.toString()
        store.currentFrame = store.currentFrame + 1
        return Boolean(Number(save)) ? Bun.write(join(store.currentFolderPath, `${currentFrame}.${format}`), Buffer.from(body.split(",")[1], 'base64'), { createPath: true, }) : "did not save"
      }
      , {
        params: t.Object({
          save: t.Union([t.Literal("1"), t.Literal("0")]),//should be bool, couldn't make it work
          format: t.Union([t.Literal('png'), t.Literal('jpeg'), t.Literal('bmp'), t.Literal('raw')])
        }),
        body: t.String(), //could be regExp
      })

    .patch("path"
      , async ({ body, store }) => store.currentFolderPath = body.replace('~', process.env.HOME as string)
      , { body: t.RegExp(/^(~|\w+)(?:[/\\]([^\/\\]+))*$/, { default: "" }) }
    )

  )
  .listen(3000);

app.options("*", cors({ methods: ["PATCH", "GET", 'POST'] }));

console.log(
  `webcam saver is running at ${app.server?.hostname}:${app.server?.port}`
);
