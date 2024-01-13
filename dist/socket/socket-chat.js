const chatListener = (io, socket) => {
    socket.on('chatNew', (channelID, message) => {
        console.log('channel: ' + channelID);
        console.log('content:\n' + String(message));
    });
};
export default chatListener;
