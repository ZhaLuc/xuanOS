import type { AppDefinition } from "./types";

type NotePage = {
  title: string;
  date?: string;
  image?: string;
  imageAlt?: string;
  paragraphs: string[];
};

const pages: NotePage[] = [
  {
    title: "sushi with family and friends",
    date: "7/23/2026",
    image: "/notes/sushi.png",
    imageAlt: "Sushi boat dinner",
    paragraphs: [],
  },
];

function createNotesContent(): HTMLElement {
  const root = document.createElement("div");
  root.className = "app-notes";

  let index = 0;

  root.innerHTML = `
    <div class="app-notes__page" data-page></div>
    <div class="app-notes__nav">
      <button type="button" class="app-notes__nav-btn" data-prev aria-label="Previous page">← prev</button>
      <span class="app-notes__pager" data-pager></span>
      <button type="button" class="app-notes__nav-btn" data-next aria-label="Next page">next →</button>
    </div>
  `;

  const pageMount = root.querySelector<HTMLElement>("[data-page]")!;
  const pager = root.querySelector<HTMLElement>("[data-pager]")!;
  const prevBtn = root.querySelector<HTMLButtonElement>("[data-prev]")!;
  const nextBtn = root.querySelector<HTMLButtonElement>("[data-next]")!;

  function render() {
    const page = pages[index]!;
    const titleHtml = page.title
      ? `<h2 class="app-notes__title">${page.title}</h2>`
      : "";
    const dateHtml = page.date
      ? `<p class="app-notes__date">${page.date}</p>`
      : "";
    const imageHtml = page.image
      ? `<img class="app-notes__image" src="${page.image}" alt="${page.imageAlt ?? ""}" draggable="false" />`
      : "";
    const bodyHtml =
      page.paragraphs.length > 0
        ? page.paragraphs.map((p) => `<p>${p}</p>`).join("")
        : "";

    pageMount.innerHTML = `
      <div class="app-notes__copy">
        ${titleHtml}
        ${dateHtml}
        ${imageHtml}
        ${bodyHtml}
      </div>
    `;

    pager.textContent = `${index + 1} / ${pages.length}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === pages.length - 1;
  }

  prevBtn.addEventListener("click", () => {
    if (index <= 0) return;
    index -= 1;
    render();
  });

  nextBtn.addEventListener("click", () => {
    if (index >= pages.length - 1) return;
    index += 1;
    render();
  });

  render();
  return root;
}

export const notesApp: AppDefinition = {
  id: "notes",
  title: "Notes",
  iconSrc: "/notes-icon.png",
  iconLabel: "Notes",
  width: 520,
  height: 520,
  createContent: createNotesContent,
};
