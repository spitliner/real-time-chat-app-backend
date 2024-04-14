export type FriendInfo = {
    roomId: string;
    lastVisit: Date;
    muteUntil: Date | undefined;
};

export type FriendsList = Record<string, FriendInfo>;

export type UserRole = {
    mainRole: 'admin' | 'moderator' | 'user';
    customRole: string[];
    manualAllowChannel: string[];
};

export type ChannelInfo = {
    public: true;
    requireRole: string[] | undefined;
    requireManual: boolean | undefined;
};
