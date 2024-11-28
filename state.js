import { EventManager, ValueUpdatedEvent } from "./index.js";
import { refreshView } from "./router.js";

export function createState(stateObj) {
    return new Proxy(stateObj, {
        get(target, prop, receiver) {
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, newValue, receiver) {
            const reflectResult = Reflect.set(target, prop, newValue, receiver);
            EventManager.dispatchEvent(new ValueUpdatedEvent(prop, newValue));
            return reflectResult;
        },
    });
}
