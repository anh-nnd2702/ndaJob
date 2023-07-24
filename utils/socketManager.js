// utils/socketManager.js
const companySockets = {};

const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A client connected');

    const companyId = socket.handshake.query.companyId;
    if (companyId) {
      const socketId = `company${companyId}`;
      companySockets[socketId] = socket;
    }

    socket.on('disconnect', () => {
      console.log('A client disconnected');

      if (companyId) {
        const socketId = `company${companyId}`;
        delete companySockets[socketId];
      }
    });
  });
};

const sendNotificationToCompany = (companyId, message, jobId, applyId) => {
  const socketId = `company${companyId}`;
  const companySocket = companySockets[socketId];
  if (companySocket) {
    companySocket.emit('notification', { message, jobId, applyId });
  }
};

module.exports = { initializeSocket, sendNotificationToCompany };
