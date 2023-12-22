/**
 * qrstat service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::qrstat.qrstat", (strapi) => ({
  async create(input) {
    return await strapi.strapi.db
      .query("api::qrstat.qrstat")
      .create({ data: { ...input, time: new Date() } });
  },
}));
