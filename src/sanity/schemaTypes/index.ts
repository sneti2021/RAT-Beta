import { page, post, redirect, siteSettings } from "./documents";
import { link, sections, seo } from "./objects";

export const schemaTypes = [
  seo,
  link,
  ...sections,
  siteSettings,
  page,
  post,
  redirect,
];
