import type { AppDefinition } from "./types";

type Video = {
  title: string;
  url: string;
  thumbnail: string;
  views: number;
  author?: string;
};

const videos: Video[] = [
  {
    title: "외국 수학 유튜버한테 수능 문제를 내봤다 (한국어로)",
    url: "https://www.youtube.com/watch?v=weEileLXEuI",
    thumbnail: "https://i.ytimg.com/vi/weEileLXEuI/hqdefault.jpg",
    views: 261340,
    author: "Zye the Fish",
  },
];

function formatViews(count: number): string {
  if (count >= 1_000_000) {
    const millions = count / 1_000_000;
    const label =
      millions >= 10 || Number.isInteger(millions)
        ? String(Math.round(millions))
        : millions.toFixed(1).replace(/\.0$/, "");
    return `${label}M views`;
  }
  if (count >= 1000) {
    const thousands = count / 1000;
    const label =
      thousands >= 100 || Number.isInteger(thousands)
        ? String(Math.round(thousands))
        : thousands.toFixed(1).replace(/\.0$/, "");
    return `${label}K views`;
  }
  return `${count.toLocaleString("en-US")} views`;
}

function createVideosContent(): HTMLElement {
  const root = document.createElement("div");
  root.className = "app-videos";

  let index = 0;

  root.innerHTML = `
    <div class="app-videos__page" data-page></div>
    <div class="app-videos__nav">
      <button type="button" class="app-videos__nav-btn" data-prev aria-label="Previous video">← prev</button>
      <span class="app-videos__pager" data-pager></span>
      <button type="button" class="app-videos__nav-btn" data-next aria-label="Next video">next →</button>
    </div>
  `;

  const pageMount = root.querySelector<HTMLElement>("[data-page]")!;
  const pager = root.querySelector<HTMLElement>("[data-pager]")!;
  const prevBtn = root.querySelector<HTMLButtonElement>("[data-prev]")!;
  const nextBtn = root.querySelector<HTMLButtonElement>("[data-next]")!;

  function render() {
    const video = videos[index]!;
    pageMount.innerHTML = `
      <h2 class="app-videos__heading">${video.title}</h2>
      <a
        class="app-videos__card"
        href="${video.url}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="app-videos__thumb-wrap">
          <img
            class="app-videos__thumb"
            src="${video.thumbnail}"
            alt=""
            draggable="false"
            width="320"
            height="180"
          />
        </div>
        <div class="app-videos__meta">
          <span class="app-videos__views">${formatViews(video.views)}</span>
        </div>
      </a>
    `;

    pager.textContent = `${index + 1} / ${videos.length}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === videos.length - 1;
  }

  prevBtn.addEventListener("click", () => {
    if (index <= 0) return;
    index -= 1;
    render();
  });

  nextBtn.addEventListener("click", () => {
    if (index >= videos.length - 1) return;
    index += 1;
    render();
  });

  render();
  return root;
}

export const videosApp: AppDefinition = {
  id: "videos",
  title: "Videos (that I find interesting)",
  iconSrc: "/videos-icon.png",
  iconLabel: "Videos",
  width: 480,
  height: 420,
  createContent: createVideosContent,
};
