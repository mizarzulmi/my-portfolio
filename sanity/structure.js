// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("tag").title("Tags"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      // S.documentTypeListItem("blockContent").title("Block Content"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["post", "project", "category", "author", "tag"].includes(
            item.getId()
          )
      ),
    ]);
