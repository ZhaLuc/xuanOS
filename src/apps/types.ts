export type AppId = "me" | "programming-comps" | "school" | "deadlock";

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
  "programming-comps",
  "school",
  "deadlock",
];
