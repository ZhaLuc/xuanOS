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

  root.innerHTML = `
    <h2 class="app-videos__heading">videos</h2>
    <ul class="app-videos__list">
      ${videos
        .map(
          (video) => `
        <li class="app-videos__item">
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
              <span class="app-videos__play" aria-hidden="true">
                <img
                  class="app-videos__play-icon"
                  src="/videos-icon.png"
                  alt=""
                  draggable="false"
                />
              </span>
            </div>
            <div class="app-videos__meta">
              <span class="app-videos__title">${video.title}</span>
              <span class="app-videos__views">${formatViews(video.views)}</span>
            </div>
          </a>
        </li>
      `,
        )
        .join("")}
    </ul>
  `;

  return root;
}

export const videosApp: AppDefinition = {
  id: "videos",
  title: "Videos",
  iconSrc: "/videos-icon.png",
  iconLabel: "Videos",
  width: 480,
  height: 420,
  createContent: createVideosContent,
};
