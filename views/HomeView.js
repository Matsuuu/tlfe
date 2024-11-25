import { html } from "lit";

export function HomeView() {
    return html`
        <p>This is the home view.</p>
        <a href="/users">Go to users listing</a>
    `;
}
