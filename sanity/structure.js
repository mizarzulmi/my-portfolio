// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title("Portofolio")
    .items([
      S.documentTypeListItem("summary").title("Summary"),
      S.documentTypeListItem("education").title("Education"),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("certification").title("Certification"),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("tag").title("Tags"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("contact").title("Contact"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "summary",
            "education",
            "experience",
            "certification",
            "post",
            "project",
            "tag",
            "category",
            "contact",
            "author",
          ].includes(item.getId())
      ),
    ]);
