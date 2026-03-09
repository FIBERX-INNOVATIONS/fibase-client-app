import mitt, { Emitter } from "mitt";
import { GlobalEventTypes } from "@/types/global_events_type";

const EventBus: Emitter<GlobalEventTypes> = mitt<GlobalEventTypes>();

export default EventBus