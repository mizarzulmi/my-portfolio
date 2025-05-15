// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title("Portofolio")
    .items([
      S.documentTypeListItem("summary").title("Summary"),
      S.documentTypeListItem("about").title("About"),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("tag").title("Tags"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "summary",
            "about",
            "experience",
            "post",
            "project",
            "category",
            "author",
            "tag",
          ].includes(item.getId())
      ),
    ]);
