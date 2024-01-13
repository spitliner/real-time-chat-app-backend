function getMessageFormat(content: string) {
    console.log(content);
}

const messageController = {
    async processMessage(channelID: string) {
        console.log(channelID);
    },
};

getMessageFormat('a\nb');

export default messageController;
