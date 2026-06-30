import { create } from "zustand";
import { getMyEvents, deleteEvent, publishEvent, closeEvent } from "../api/Api";

const useEventStore = create((set) => ({
  events: [],

  setEvents: (events) => set({ events }),

  loadEvents: async () => {
  try {
    const response = await getMyEvents();

    const activeEvents = response.data.data.items.filter(
      (event) => event.status !== "Cancelled"
    );

    set({
      events: activeEvents,
    });
  } catch (error) {
    console.log(error);
  }
},

  deleteEventFromStore: async (eventId) => {
  await deleteEvent(eventId);

  set((state) => ({
    events: state.events.filter(
      (event) => event.eventId !== eventId
    ),
  }));
},


    publishEventInStore: async (eventId) => {
    await publishEvent(eventId);

    set((state) => ({
      events: state.events.map((event) =>
        event.eventId === eventId
          ? { ...event, status: "Published" }
          : event
      ),
    }));
  },

  closeEventInStore: async (eventId) => {
    await closeEvent(eventId);

    set((state) => ({
      events: state.events.map((event) =>
        event.eventId === eventId
          ? { ...event, status: "Closed" }
          : event
      ),
    }));
  },
  
  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events],
    })),

  updateEventInStore: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.eventId === updatedEvent.eventId
          ? updatedEvent
          : event
      ),
    })),
}));



export default useEventStore;