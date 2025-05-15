import { blockContent } from "./blockContent";
import { category } from "./category";
import { post } from "./post";
import { author } from "./author";
import { tag } from "./tag";
import { project } from "./project";
import { summary } from "./summary";
import { about } from "./about";
import { experience } from "./experience";

export const schema = {
  types: [
    blockContent,
    category,
    post,
    author,
    tag,
    project,
    summary,
    about,
    experience,
  ],
};
