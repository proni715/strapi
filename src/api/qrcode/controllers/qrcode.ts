/**
 * qrcode controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::qrcode.qrcode",
  ({ strapi }) => ({
    async getByCode(ctx) {
      if (!["audio", "high", "low"].includes(ctx.request.query.quality))
        return ctx.badRequest("Invalid quality", {
          quality: ["audio", "high", "low"],
        });
      if (!["android", "ios"].includes(ctx.request.query.os))
        return ctx.badRequest("Invalid os", {
          os: ["android", "ios"],
        });
      try {
        const format = ctx.request.query.quality === "audio" ? "m4a" : "mp4";
        const name =
          ctx.request.query.quality === "audio"
            ? "Audio"
            : ctx.request.query.quality === "high"
            ? "High"
            : "Low";

        const qrcode = await strapi
          .service("api::qrcode.qrcode")
          .getByCode(ctx.params.code);
        qrcode.file = `uploads/${qrcode.file}-${name}.${format}`;

        const sanitizedResults = await this.sanitizeOutput(qrcode, ctx);

        await strapi.service("api::qrstat.qrstat").create({
          ...ctx.request.query,
          code: ctx.params.code,
          user: ctx.request.query.device,
        });

        return this.transformResponse(sanitizedResults);
      } catch (err) {
        console.log(err);
      }
    },
  })
);
