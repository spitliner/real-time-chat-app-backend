export type Friends = Record<string, {
    lastVisit: Date;
    channel: string;
}>;

export type UserSettings = {
    theme: string;
};
