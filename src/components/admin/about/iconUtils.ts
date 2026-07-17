import type { ComponentType } from "react";

export type IconComponentType = ComponentType<{ className?: string }>;

const iconPackLoaders = {
  Fa: () => import("react-icons/fa"),
  Si: () => import("react-icons/si"),
  Di: () => import("react-icons/di"),
  Tb: () => import("react-icons/tb"),
} as const;

type IconPackKey = keyof typeof iconPackLoaders;
type IconPackModule = Record<string, IconComponentType>;

const packCache = new Map<IconPackKey, Promise<IconPackModule>>();
let allIconsCache: Promise<Record<string, IconComponentType>> | null = null;

const getIconPackKey = (iconName: string) => {
  return Object.keys(iconPackLoaders).find((prefix) =>
    iconName.startsWith(prefix),
  ) as IconPackKey | undefined;
};

const loadIconPack = async (packKey: IconPackKey) => {
  const cached = packCache.get(packKey);
  if (cached) return cached;

  const loader = iconPackLoaders[packKey];
  const promise = loader().then((module) => module as IconPackModule);
  packCache.set(packKey, promise);
  return promise;
};

export const loadAllIcons = async () => {
  if (!allIconsCache) {
    allIconsCache = Promise.all(
      (Object.keys(iconPackLoaders) as IconPackKey[]).map(async (packKey) => {
        const pack = await loadIconPack(packKey);
        return pack;
      }),
    ).then((packs) => Object.assign({}, ...packs));
  }

  return allIconsCache;
};

export const getIconComponent = async (iconName: string) => {
  const packKey = getIconPackKey(iconName);
  if (!packKey) return undefined;

  const pack = await loadIconPack(packKey);
  return pack[iconName];
};
