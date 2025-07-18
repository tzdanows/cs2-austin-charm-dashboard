import { App, fsRoutes, staticFiles } from "fresh";
import { define, type State } from "./utils.ts";

// Try to determine if we're on Deno Deploy
const isDeployment = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

export const app = new App<State>({
  // Use dev mode on deployment to avoid build cache issues
  dev: isDeployment,
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
