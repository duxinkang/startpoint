/**
 * Sanity Studio configuration — mounted at /studio.
 * Activated after running `npx sanity init` and populating .env.local.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "default",
  title: "StartPoint Studio",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons
            S.listItem()
              .title("Site settings")
              .child(
                S.editor()
                  .id("siteSettings")
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.listItem()
              .title("Homepage")
              .child(
                S.editor()
                  .id("homepage")
                  .schemaType("homepage")
                  .documentId("homepage"),
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("caseStudy").title("Case studies"),
            S.documentTypeListItem("teamMember").title("Team members"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
