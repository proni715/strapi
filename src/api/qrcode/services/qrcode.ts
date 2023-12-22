/**
 * qrcode service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::qrcode.qrcode", (strapi) => ({
  async getByCode(code: string) {
    return await strapi.strapi.db
      .query("api::qrcode.qrcode")
      .findOne({ where: { code } });
  },
}));
