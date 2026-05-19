// app/event_bus.ts

import { createEventBus } from "@ui/version_3/utils/event_bus_util";
import { GlobalEventTypes } from "@/types/global_events_type";

export const EventBus = createEventBus<GlobalEventTypes>();
