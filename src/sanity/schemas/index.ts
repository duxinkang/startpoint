import type { SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { homepage } from "./homepage";
import { service } from "./service";
import { caseStudy } from "./caseStudy";
import { teamMember } from "./teamMember";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homepage,
  service,
  caseStudy,
  teamMember,
];
