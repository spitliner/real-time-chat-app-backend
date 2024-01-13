export type IncomingMessageType = {
    mention: string[];
    attachment: Uint8Array[];
    content: string | undefined;
    reply: string | undefined;
};

export type OutcomingMessageType = {
    id: string;
    channelId: string;
    userId: string;
    createdAt: Date;
    lastEdited: Date | undefined;
    mention: string[];
    attachment: Uint8Array[];
    content: string | undefined;
    reply: string | undefined;
};
