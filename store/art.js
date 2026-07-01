import { create } from "zustand";

const CACHE_DURATION = 1000 * 60 * 30;

export const useArtStore = create((set, get) => ({
  arts: {},

  addArt: (art) =>
    set((state) => ({
      arts: {
        ...state.arts,
        [art.ID]: {
          data: art,
          cachedAt: Date.now(),
        },
      },
    })),

  addArts: (arts) =>
    set((state) => ({
      arts: {
        ...state.arts,
        ...Object.fromEntries(
          arts.map((art) => [
            art.ID,
            {
              data: art,
              cachedAt: Date.now(),
            },
          ])
        ),
      },
    })),

  getArt: (id) => {
    const item = get().arts[id];

    if (!item) return null;

    const isExpired =
      Date.now() - item.cachedAt > CACHE_DURATION;

    if (isExpired) {
      set((state) => {
        const arts = { ...state.arts };
        delete arts[id];
        return { arts };
      });

      return null;
    }

    return item.data;
  },

  clearArts: () => set({ arts: {} }),

  clearExpiredArts: () =>
    set((state) => {
      const now = Date.now();

      const arts = Object.fromEntries(
        Object.entries(state.arts).filter(
          ([_, item]) =>
            now - item.cachedAt <= CACHE_DURATION
        )
      );

      return { arts };
    }),
}));