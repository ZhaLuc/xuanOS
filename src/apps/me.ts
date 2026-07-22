import type { AppDefinition } from "./types";

const githubIcon = `
<svg class="app-me__icon" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .26.18.58.69.48A10.33 10.33 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
</svg>
`;

const gmailIcon = `
<svg class="app-me__icon" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.2-8 5-8-5V6l8 5 8-5v2.2z"/>
</svg>
`;

function createMeContent(): HTMLElement {
  const body = document.createElement("div");
  body.className = "app-me";
  body.innerHTML = `
    <img
      class="app-me__portrait"
      src="/me-portrait.png"
      alt="me"
      draggable="false"
      width="180"
      height="240"
    />
    <div class="app-me__side">
      <p class="app-me__quote">i code stuff i like</p>
      <div class="app-me__actions">
        <a
          class="app-me__btn"
          href="https://github.com/LucasZhang3"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${githubIcon}
          <span>github</span>
        </a>
        <a
          class="app-me__btn"
          href="mailto:lucaszhangbusiness@gmail.com"
        >
          ${gmailIcon}
          <span>email</span>
        </a>
      </div>
    </div>
  `;
  return body;
}

export const meApp: AppDefinition = {
  id: "me",
  title: "Me",
  iconSrc: "/me-icon.png",
  iconLabel: "Me",
  width: 520,
  height: 360,
  createContent: createMeContent,
};
