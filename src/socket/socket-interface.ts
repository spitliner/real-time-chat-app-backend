import {type IncomingMessageType, type OutcomingMessageType} from '../type/message-type.js';

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
    chatNew: (channelID: string, message: IncomingMessageType) => void;
    chatEdit: (channelID: string, messageID: string, content: string) => void;
    chatTyping: (channelID: string) => void;
    joinChannel: (groupID: string, channelID: string) => void;
    getMessage: (messageIds: string []) => void;
    modAction: (groupID: string, channelID: string, messageID: string) => void;
    adminAction: (groupID: string, channelID: string, messageID: string) => void;
    userTyping: (channelID: string, userID: string) => void;
};

export type InterServerEvents = {
    ping: () => void;
};

export type SocketData = {
    test: string;
};
