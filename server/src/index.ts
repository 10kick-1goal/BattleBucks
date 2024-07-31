import app from "./app";
import { io } from "./socket";

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5001;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});

// Socket.IO server
console.log(`Socket.IO server running on port ${SOCKET_PORT}`);
io.listen(Number(SOCKET_PORT));
