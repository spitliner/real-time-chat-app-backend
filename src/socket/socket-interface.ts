import { type IncomingMessageType, type OutcomingMessageType } from '../type/message-type.js';

export type ServerToClientEvents = {
    chatSync: (message: OutcomingMessageType) => void;
    chatEdited: (messageEditer: {
        id: string;
        editContent: string;
        editAttachment: string[];
        editMention: string[];
        editMentionRole: string[];
    }) => void;
    chatDelete: (messageID: string) => void;
    chatGet: (message: OutcomingMessageType[]) => void;
    userNotify: (channelID: string) => void;
    modNotify: (groupID: string, channelID: string) => void;
    adminNotify: (groupID: string, channelID: string) => void;
    userTyping: (channelID: string, userID: string) => void;
    serverError: (error: {error: string}) => void;
};

export type ClientToServerEvents = {
    chatNew: (channelID: unknown, message: unknown) => void;
    chatEdit: (channelID: unknown, messageID: unknown, editedContent: unknown) => void;
    chatTyping: (channelID: unknown) => void;
    joinChannel: (groupID: unknown, channelID: unknown) => void;
    getMessage: (messageIds: unknown) => void;
    modAction: (groupID: unknown, channelID: unknown, messageID: unknown) => void;
    adminAction: (groupID: unknown, channelID: unknown, messageID: unknown) => void;
    userTyping: (channelID: unknown, userID: unknown) => void;
};

export type InterServerEvents = {
    ping: () => void;
};

export type SocketData = {
    test: string;
};
