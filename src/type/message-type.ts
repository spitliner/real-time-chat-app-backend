export type IncomingMessageType = {
    mention: string[];
    attachment: Uint8Array[];
    content?: string;
    reply?: string;
};

export type IncomingEditMessageType = {
    editedMention?: string[];
    newAttachment?: Uint8Array[];
    oldAttachmentRemove?: string[];
    editedContent: string | undefined;
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
