import app from "./api/index.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`[API] Techfest 3D Showcase backend listening on http://localhost:${PORT}`);
  console.log(`[API] Health check: http://localhost:${PORT}/api/health`);
  console.log(`[API] Models endpoint: http://localhost:${PORT}/api/models`);
});
