import marked from "marked";

export const defaultContent = `This is the initial value of a page. **You should definitely update this.**
This editor supports _markdown_! Any markdown you enter will be converted into HTML!`;

export function defaultWiki() {
  return {
    id: null,
    topic: null,
    title: "",
    slug: "",
    content: defaultContent,
    description: "",
    isPublished: false,
  }
}

/**
 *
 * @param {string} markdown
 * @returns {string} Parsed markdown as HTML or an error message
 */
export function parseMarkdown(markdown) {

  marked.setOptions({
    gfm: true,
 });

  try {
    return marked(markdown);
  }
  catch (err) {
    return err.message;
  }
}

export async function pageExists(slug) {
  const response = await fetch(`/api/wiki/?slug=${slug}`, {
    credentials: "include",
    method: "HEAD",
  });

  return response.ok && response.status !== 404;
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

export async function getByID(id) {
  const isoFetch = this.fetch || fetch;

  const response = await isoFetch(`/api/wiki/${id}`, {
    credentials: "include",
    method: "GET",
  });

  if (response.ok) {
    return await response.json();
  }
}

export async function updateWikiPage(wiki) {

  const response = await fetch(`/api/wiki/${wiki.id}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(wiki)
  });

  return response.ok;
}


export const toSlug = (title = "") => {
  let slug = title.trim()
    .toLowerCase()
    .replace(/\?/, "")
    .replace(/\&/, "")
    .replace(/ /g, "-");

  return encodeURI(slug);
};

export async function getSettings() {
  const response = await fetch(`/api/wiki/settings`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}