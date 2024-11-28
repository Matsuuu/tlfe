import { initRouter } from "./router.js";

export class ValueUpdatedEvent extends Event {
    /**
     * @param {string | symbol} prop
     * @param {any} newValue
     */
    constructor(prop, newValue) {
        super(ValueUpdatedEvent.name);

        this.prop = prop;
        this.newValue = newValue;
    }
}

class EventManagerInstanceFactorio extends EventTarget {
    constructor() {
        super();
        this.addEventListener(ValueUpdatedEvent.name, this);
    }

    handleEvent(ev) {
        if (ev instanceof ValueUpdatedEvent) {
            // console
        }
    }
}

export const EventManager = new EventManagerInstanceFactorio();
initRouter();
