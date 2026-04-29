import {
  author,
  category,
  hubspotForm,
  page,
  post,
  redirect,
  resource,
  reusableCta,
  siteSettings,
  tag,
} from "./documents";
import { link, sections, seo } from "./objects";

export const schemaTypes = [
  seo,
  link,
  ...sections,
  siteSettings,
  reusableCta,
  hubspotForm,
  resource,
  author,
  category,
  tag,
  page,
  post,
  redirect,
];
