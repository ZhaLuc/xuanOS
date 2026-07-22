import type { AppDefinition } from "./types";

type CharacterSlide = {
  kind: "character";
  name: string;
  portrait: string;
  alt: string;
  paragraphs: string[];
};

type StatsSlide = {
  kind: "stats";
  name: string;
  rankSrc: string;
  profileUrl: string;
  profileLabel: string;
};

type Slide = CharacterSlide | StatsSlide;

const slides: Slide[] = [
  {
    kind: "character",
    name: "seven deadlock.",
    portrait: "/seven.png",
    alt: "Seven",
    paragraphs: [
      "oh where do i even start.",
      "seven is a serial crime committer, to the point where his execution was demanded by the OSIC.",
      "Caught and strapped to an electric chair, as shown with his helmet which fused into his skin post electrocution, he was supposedly dead.",
      "however, alive and competing in the ritual, his goal is to stive for apotheosis and to become god.",
      "fun, yes. evil, yes.",
    ],
  },
  {
    kind: "character",
    name: "wraith...",
    portrait: "/wraith.png",
    alt: "Wraith",
    paragraphs: [
      "serial gambler, best m1 carry in the game. favorite character to play.",
      "wraith participates in the ritual primarily to gain wealth, popularity, and power, as the ruthless owner of a new york's gambling empire.",
      "what a boss",
    ],
  },
  {
    kind: "character",
    name: "billy",
    portrait: "/billy.png",
    alt: "Billy",
    paragraphs: [
      "best grifter and virtue signaler around.",
      "goat isn't only for his head, he is the goat",
      "he calls out evil in the world just to do nothing about them, wow just like me.",
      "this the real goal fsfs.",
    ],
  },
  {
    kind: "stats",
    name: "my rank",
    rankSrc: "/deadlock-rank.png",
    profileUrl: "https://statlocker.gg/profile/3634006",
    profileLabel: "statlocker profile",
  },
];

function createDeadlockContent(): HTMLElement {
  const root = document.createElement("div");
  root.className = "app-deadlock";

  let index = 0;

  root.innerHTML = `
    <div class="app-deadlock__slide" data-slide></div>
    <div class="app-deadlock__nav">
      <button type="button" class="app-deadlock__nav-btn" data-prev aria-label="Previous slide">← prev</button>
      <span class="app-deadlock__pager" data-pager></span>
      <button type="button" class="app-deadlock__nav-btn" data-next aria-label="Next slide">next →</button>
    </div>
  `;

  const slideMount = root.querySelector<HTMLElement>("[data-slide]")!;
  const pager = root.querySelector<HTMLElement>("[data-pager]")!;
  const prevBtn = root.querySelector<HTMLButtonElement>("[data-prev]")!;
  const nextBtn = root.querySelector<HTMLButtonElement>("[data-next]")!;

  function render() {
    const slide = slides[index]!;

    if (slide.kind === "character") {
      slideMount.className = "app-deadlock__slide";
      slideMount.innerHTML = `
        <img
          class="app-deadlock__portrait"
          src="${slide.portrait}"
          alt="${slide.alt}"
          draggable="false"
          width="140"
          height="140"
        />
        <div class="app-deadlock__copy">
          <h2 class="app-deadlock__name">${slide.name}</h2>
          ${slide.paragraphs.map((p) => `<p>${p}</p>`).join("")}
        </div>
      `;
    } else {
      slideMount.className = "app-deadlock__slide app-deadlock__slide--stats";
      slideMount.innerHTML = `
        <h2 class="app-deadlock__name">${slide.name}</h2>
        <img
          class="app-deadlock__rank"
          src="${slide.rankSrc}"
          alt="Deadlock rank"
          draggable="false"
        />
        <a
          class="app-deadlock__link"
          href="${slide.profileUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >${slide.profileLabel}</a>
      `;
    }

    pager.textContent = `${index + 1} / ${slides.length}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
  }

  prevBtn.addEventListener("click", () => {
    if (index <= 0) return;
    index -= 1;
    render();
  });

  nextBtn.addEventListener("click", () => {
    if (index >= slides.length - 1) return;
    index += 1;
    render();
  });

  render();
  return root;
}

export const deadlockApp: AppDefinition = {
  id: "deadlock",
  title: "Deadlock",
  iconSrc: "/deadlock-icon.png",
  iconLabel: "Deadlock",
  width: 520,
  height: 460,
  createContent: createDeadlockContent,
};
