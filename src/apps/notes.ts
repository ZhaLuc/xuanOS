import type { AppDefinition } from "./types";

type NoteImage = {
  src: string;
  alt: string;
};

type NotePage = {
  title: string;
  date?: string;
  images: NoteImage[];
  paragraphs: string[];
};

const pages: NotePage[] = [
  {
    title: "sushi with family and friends",
    date: "7/23/2026",
    images: [{ src: "/notes/sushi.png", alt: "Sushi boat dinner" }],
    paragraphs: [],
  },
  {
    title: "dinner with my family and a beautiful sky",
    date: "7/27/2026",
    images: [
      { src: "/notes/dinner.png", alt: "Family dinner table" },
      { src: "/notes/sky.png", alt: "Sunset sky over Lam's Market" },
    ],
    paragraphs: [],
  },
  {
    title: "Seafood boil w/ family 🤤",
    date: "7/29/2026",
    images: [{ src: "/notes/seafood-boil.png", alt: "Seafood boil and fries with family" }],
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
    const imageHtml =
      page.images.length > 0
        ? `<div class="app-notes__images">${page.images
            .map(
              (image) => `
            <img
              class="app-notes__image"
              src="${image.src}"
              alt="${image.alt}"
              draggable="false"
            />
          `,
            )
            .join("")}</div>`
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
