import { blockContent } from "./blockContent";
import { category } from "./category";
import { post } from "./post";
import { author } from "./author";
import { tag } from "./tag";
import { project } from "./project";
import { summary } from "./summary";
import { about } from "./about";
import { education } from "./education";
import { experience } from "./experience";
import { certification } from "./certification";

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
    education,
    experience,
    certification,
  ],
};
