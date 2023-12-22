/**
 * qrcode router
 */

import { factories } from "@strapi/strapi";

const defaultRouter = factories.createCoreRouter("api::qrcode.qrcode");

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: "GET",
    path: "/getVideo/:code",
    handler: "qrcode.getByCode",
    description: "get video by code",
  },
];

export default customRouter(defaultRouter, myExtraRoutes);
