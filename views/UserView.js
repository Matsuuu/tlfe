import { html } from "lit";
import { RouterState } from "../router.js";
import { createState } from "../state.js";

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
