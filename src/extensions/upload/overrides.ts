import _ from "lodash";
import path from "path";
import { extension } from "mime-types";

export async function formatFileInfoOverride(
  { filename, type, size },
  fileInfo,
  metas
) {
  const fileService = strapi.plugin("upload").service("file");

  let ext = path.extname(filename);

  if (!ext) {
    ext = `.${extension(type)}`;
  }
  const usedName = fileInfo.name || filename;
  const basename = path.basename(usedName, ext);

  const entity: any = {
    ext,
    mime: type,
    hash: basename,
    name: usedName,
    folder: fileInfo.folder,
    caption: fileInfo.caption,
    alternativeText: fileInfo.alternativeText,
    size: Math.round((size / 1000) * 100) / 100,
    folderPath: await fileService.getFolderPath(fileInfo.folder),
  };

  const { refId, ref, field } = metas;

  if (refId && ref && field) {
    entity.related = [
      {
        id: refId,
        __type: ref,
        __pivot: { field },
      },
    ];
  }

  if (metas.path) {
    entity.path = metas.path;
  }

  if (metas.tmpWorkingDirectory) {
    entity.tmpWorkingDirectory = metas.tmpWorkingDirectory;
  }

  return entity;
}
