const MIN_WIDTH = 1280;
const MIN_HEIGHT = 720;

export function createResolutionWarning(): {
  root: HTMLElement;
  sync: () => void;
} {
  const root = document.createElement("div");
  root.className = "res-warning";
  root.setAttribute("role", "status");
  root.innerHTML = `
    <p class="res-warning__text">this project will suck at this resolution</p>
    <button type="button" class="res-warning__close" aria-label="Dismiss">x</button>
  `;

  let dismissed = false;

  root.querySelector(".res-warning__close")!.addEventListener("click", () => {
    dismissed = true;
    root.classList.remove("is-visible");
  });

  function sync() {
    const tooSmall =
      window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT;
    root.classList.toggle("is-visible", tooSmall && !dismissed);
    if (!tooSmall) {
      dismissed = false;
    }
  }

  return { root, sync };
}
