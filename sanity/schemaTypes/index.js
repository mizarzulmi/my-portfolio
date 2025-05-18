import { blockContent } from "./blockContent";
import { category } from "./category";
import { post } from "./post";
import { author } from "./author";
import { tag } from "./tag";
import { project } from "./project";
import { summary } from "./summary";
import { education } from "./education";
import { experience } from "./experience";
import { certification } from "./certification";
import { contact } from "./contact";

export const schema = {
  types: [
    blockContent,
    category,
    post,
    author,
    tag,
    project,
    summary,
    education,
    experience,
    certification,
    contact,
  ],
};
