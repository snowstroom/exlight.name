export interface IMenuItem {
    name: string;
    route: string[];
    rel?: string;
    active?: boolean;
    exact?: boolean;
}
