import type { AppDefinition } from "./types";

function createMusicContent(): HTMLElement {
  const body = document.createElement("div");
  body.className = "app-music";
  body.innerHTML = `
    <section class="app-music__pane">
      <h2 class="app-music__heading">favorite artists</h2>
      <p class="app-music__empty">coming soon...</p>
    </section>
    <section class="app-music__pane">
      <h2 class="app-music__heading">favorite songs</h2>
      <p class="app-music__empty">coming soon...</p>
    </section>
  `;
  return body;
}

export const musicApp: AppDefinition = {
  id: "music",
  title: "Music",
  iconSrc: "/music-icon.png",
  iconLabel: "Music",
  width: 560,
  height: 400,
  createContent: createMusicContent,
};
