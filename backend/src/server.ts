/**
 * Entry point for the backend server.
 * Starts Express on the configured port 5001 (default: 5000).
 *
 * Usually just imports app.ts and calls app.listen().
 */
import app from "./app";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
