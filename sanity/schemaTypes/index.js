import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { tagType } from "./tagType";
import { projectType } from "./projectType";

export const schema = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    tagType,
    projectType,
  ],
};
