import { html } from "lit-html";
import { createState } from "../state.js";

export function HomeView() {
    const state = createState({
        count: 0,
    });

    function increment() {
        state.count += 1;
        console.log(state.count);
    }

    return () => html`
        <h2>Turku <3 Frontend</h2>
        <a href="/users">Users</a>

        <button @click=${increment}>This button has been pressed ${state.count} times</button>
    `;
}
