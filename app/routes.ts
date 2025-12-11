import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("figure/:id", "routes/figure.$id.tsx"),
] satisfies RouteConfig;
