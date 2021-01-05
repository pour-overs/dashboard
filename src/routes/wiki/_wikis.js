export async function pageExists(slug) {
  const response = await fetch(`/api/wiki/${slug}`, {
    credentials: "include",
    method: "HEAD",
  });

  return response.ok;
}

export async function createWikiPage(wikiData) {
  const response = await fetch(`/api/wiki/create`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(wikiData)
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function listAllWikiPages() {
  const response = await fetch(`/api/wiki`, {
    credentials: "include"
  });

  if (response.ok) {
    const pages = await response.json();
    return pages;
  }
}

export async function updateWikiPage() { }


export const toSlug = (title = "") => encodeURI(title.trim().toLowerCase().replace(/ /g, "-"));