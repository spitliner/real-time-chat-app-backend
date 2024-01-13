function getMessageFormat(content) {
    console.log(content);
}
const messageController = {
    async processMessage(channelID) {
        console.log(channelID);
    },
};
getMessageFormat('a\nb');
export default messageController;
