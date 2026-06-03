import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes.analyze import router as analyze_router

load_dotenv()

app = FastAPI(
    title="Aurae API",
    description="AI-powered resume analyzer backend",
    version="1.0.0",
)

# ── CORS ────────────────────────────────────────────────────────
origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,https://your-app.vercel.app",
).split(",")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ──────────────────────────────────────────────────────
app.include_router(analyze_router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "aurae-api"}
