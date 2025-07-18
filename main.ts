import { App, fsRoutes, staticFiles } from "fresh";
import { define, type State } from "./utils.ts";

export const app = new App<State>({
  // Force dev mode on Deno Deploy to avoid build requirements
  dev: true,
});

app.use(staticFiles());

// Middleware for request logging
const loggerMiddleware = define.middleware((ctx) => {
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  return ctx.next();
});
app.use(loggerMiddleware);

await fsRoutes(app, {
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}
