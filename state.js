import { RouterState } from "./router.js";

/**
 * @template { Record<string, unknown> } T
 * @param { T } stateObj
 *
 * @returns {T}
 */
export function createState(stateObj) {
    return new Proxy(stateObj, {
        get(target, prop, receiver) {
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, newValue, receiver) {
            RouterState.reRender();
            return Reflect.set(target, prop, newValue, receiver);
        },
    });
}
