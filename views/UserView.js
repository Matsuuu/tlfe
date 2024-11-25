import { RouterState } from "../router";

export function UserView() {
    return `<p>User view for user ID ${RouterState.params.id}</p>
`;
}
