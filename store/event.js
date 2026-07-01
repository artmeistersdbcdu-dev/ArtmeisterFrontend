import { create } from "zustand";

const CACHE_DURATION = 1000 * 60 * 30;

export const useEventStore = create((set, get) => ({
  events: {},

  addEvent: (event) =>
    set((state) => ({
      events: {
        ...state.arts,
        [art.ID]: {
          data: art,
          cachedAt: Date.now(),
        },
      },
    })),

  addEvents: (events) =>
    set((state) => ({
      events: {
        ...state.events,
        ...Object.fromEntries(
          events.map((event) => [
            art.ID,
            {
              data: art,
              cachedAt: Date.now(),
            },
          ])
        ),
      },
    })),

  getEvent: (id) => {
    const item = get().events[id];

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

  clearEvents: () => set({ events: {} }),

  clearExpiredEvents: () =>
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