export type AppId =
  | "me"
  | "notes"
  | "projects"
  | "programming-comps"
  | "school"
  | "music"
  | "videos"
  | "deadlock";

export type AppDefinition = {
  id: AppId;
  title: string;
  iconSrc: string;
  iconLabel: string;
  width: number;
  height: number;
  createContent: () => HTMLElement;
};

export const appOrder: AppId[] = [
  "me",
  "notes",
  "projects",
  "programming-comps",
  "school",
  "music",
  "videos",
  "deadlock",
];
