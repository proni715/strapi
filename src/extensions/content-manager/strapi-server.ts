import crypto from "crypto";

export default (plugin) => {
  async function createQrCode() {
    const code = crypto
      .randomInt(0, 10 ** 9 - 1)
      .toString()
      .padStart(9, "0");
    const isInDb = await strapi.db
      .query("api::qrcode.qrcode")
      .findOne({ where: { code } });
    if (isInDb) createQrCode();
    return code;
  }

  let original = plugin.controllers["collection-types"].create;
  plugin.controllers["collection-types"].create = async (ctx) => {
    if (ctx.params.model === "api::qrcode.qrcode") {
      [ctx.request.body.file] = ctx.request.body.media[0]?.name.split("-");
      ctx.request.body.code = await createQrCode();
    }

    return original(ctx);
  };

  return plugin;
};
