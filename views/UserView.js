import { html } from "lit";
import { RouterState } from "../router.js";

export function UserView() {
    const state = createState({
        likes: 0,
    });

    function incrementLike() {
        state.likes += 1;
    }

    return () => html`
        <p>User view for user ID ${RouterState.params.id}</p>
        <button @click=${incrementLike}>Like this profile. Likes: ${state.likes}</button>
    `;
}

/**
 * @template { Record<string, unknown> } T
 * @param { T } stateObj
 *
 * @returns {T}
 */
function createState(stateObj) {
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
