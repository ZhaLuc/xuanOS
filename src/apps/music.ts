import type { AppDefinition } from "./types";

type Artist = {
  name: string;
  image: string;
};

type Song = {
  title: string;
  artist: string;
  image: string;
  preview: string;
};

const favoriteArtists: Artist[] = [
  { name: "NewJeans", image: "/music/artist-newjeans.jpg" },
  { name: "DEAN", image: "/music/artist-dean.jpg" },
  { name: "aespa", image: "/music/artist-aespa.jpg" },
  { name: "ILLIT", image: "/music/artist-illit.jpg" },
];

const favoriteSongs: Song[] = [
  {
    title: "Armageddon",
    artist: "aespa",
    image: "/music/song-armageddon.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/84/34/f0/8434f0e6-0d39-0340-030a-0168bba3825b/mzaf_7352837177102038356.plus.aac.p.m4a",
  },
  {
    title: "54321 (feat. HAEWON)",
    artist: "pH-1",
    image: "/music/song-54321.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d4/97/65/d497652a-85cf-0c33-4bd5-bd1fc13e500f/mzaf_11947006354794201947.plus.aac.p.m4a",
  },
  {
    title: "What 2 Do (feat. Crush & Jeff Bernat)",
    artist: "DEAN",
    image: "/music/song-what2do.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ca/59/d9/ca59d9fc-323d-52ad-3b7d-00e2b1e68f13/mzaf_7888478713517834.plus.aac.p.m4a",
  },
  {
    title: "D (Half Moon) [feat. Gaeko]",
    artist: "DEAN",
    image: "/music/song-halfmoon.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/98/4f/8e/984f8e93-2901-c8b3-5883-8281b363f723/mzaf_11734879238275302685.plus.aac.p.m4a",
  },
  {
    title: "Aeao",
    artist: "Dynamicduo & DJ Premier",
    image: "/music/song-aeao.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/64/da/16/64da16fe-a645-a137-56ff-96e67da86f0c/mzaf_6847606205009456561.plus.aac.p.m4a",
  },
];

const VOLUME_KEY = "xuanos-music-volume";
const DEFAULT_VOLUME = 70;

function readSavedVolume(): number {
  try {
    const raw = localStorage.getItem(VOLUME_KEY);
    if (raw == null) return DEFAULT_VOLUME;
    const value = Number(raw);
    if (!Number.isFinite(value)) return DEFAULT_VOLUME;
    return Math.min(100, Math.max(0, Math.round(value)));
  } catch {
    return DEFAULT_VOLUME;
  }
}

function writeSavedVolume(value: number) {
  try {
    localStorage.setItem(VOLUME_KEY, String(value));
  } catch {
    void 0;
  }
}

function createMusicContent(): HTMLElement {
  const body = document.createElement("div");
  body.className = "app-music";

  const audio = new Audio();
  audio.preload = "none";
  let activeButton: HTMLButtonElement | null = null;
  const savedVolume = readSavedVolume();

  function setPlaying(button: HTMLButtonElement | null, playing: boolean) {
    body
      .querySelectorAll(".app-music__play.is-playing")
      .forEach((node) => node.classList.remove("is-playing"));
    if (button && playing) {
      button.classList.add("is-playing");
      activeButton = button;
    } else {
      activeButton = null;
    }
  }

  body.innerHTML = `
    <section class="app-music__pane">
      <h2 class="app-music__heading">favorite artists</h2>
      <ul class="app-music__list">
        ${favoriteArtists
          .map(
            (artist) => `
          <li class="app-music__item">
            <img class="app-music__art" src="${artist.image}" alt="" draggable="false" width="56" height="56" />
            <div class="app-music__meta">
              <span class="app-music__name">${artist.name}</span>
            </div>
          </li>
        `,
          )
          .join("")}
      </ul>
    </section>
    <section class="app-music__pane">
      <div class="app-music__songs-head">
        <h2 class="app-music__heading">favorite songs</h2>
        <label class="app-music__volume">
          <span class="app-music__volume-label">vol</span>
          <input
            class="app-music__volume-slider"
            data-volume
            type="range"
            min="0"
            max="100"
            value="${savedVolume}"
            aria-label="Preview volume"
          />
        </label>
      </div>
      <ul class="app-music__list" data-songs></ul>
    </section>
  `;

  const songList = body.querySelector<HTMLElement>("[data-songs]")!;
  const volumeSlider = body.querySelector<HTMLInputElement>("[data-volume]")!;

  audio.volume = savedVolume / 100;
  volumeSlider.addEventListener("input", () => {
    const value = Number(volumeSlider.value);
    audio.volume = value / 100;
    writeSavedVolume(value);
  });

  favoriteSongs.forEach((song) => {
    const item = document.createElement("li");
    item.className = "app-music__item";
    item.innerHTML = `
      <div class="app-music__cover">
        <img class="app-music__art" src="${song.image}" alt="" draggable="false" width="56" height="56" />
        <button type="button" class="app-music__play" aria-label="Play preview of ${song.title}">
          <span class="app-music__play-icon" aria-hidden="true"></span>
        </button>
      </div>
      <div class="app-music__meta">
        <span class="app-music__name">${song.title}</span>
        <span class="app-music__sub">${song.artist}</span>
      </div>
    `;

    const playBtn = item.querySelector<HTMLButtonElement>(".app-music__play")!;
    playBtn.addEventListener("click", async (event) => {
      event.stopPropagation();

      if (activeButton === playBtn && !audio.paused) {
        audio.pause();
        setPlaying(null, false);
        return;
      }

      try {
        audio.pause();
        audio.src = song.preview;
        await audio.play();
        setPlaying(playBtn, true);
      } catch {
        setPlaying(null, false);
      }
    });

    songList.append(item);
  });

  audio.addEventListener("ended", () => setPlaying(null, false));
  audio.addEventListener("pause", () => {
    if (audio.ended) return;
    if (!audio.seeking) {
      setPlaying(null, false);
    }
  });

  const musicRoot = body as HTMLElement & { destroy?: () => void };
  musicRoot.destroy = () => {
    audio.pause();
    audio.removeAttribute("src");
    setPlaying(null, false);
  };

  return musicRoot;
}

export const musicApp: AppDefinition = {
  id: "music",
  title: "Music",
  iconSrc: "/music-icon.png",
  iconLabel: "Music",
  width: 620,
  height: 440,
  createContent: createMusicContent,
};
