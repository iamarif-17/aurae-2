import os
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Request
from dotenv import load_dotenv

load_dotenv()

_creds_path = os.getenv("FIREBASE_CREDENTIALS_PATH", "firebase_credentials.json")

# Initialize Firebase Admin only once
if not firebase_admin._apps:
    cred = credentials.Certificate(_creds_path)
    firebase_admin.initialize_app(cred)


def get_current_user(request: Request) -> dict | None:
    """
    Verify the Firebase ID token from the Authorization header.
    Returns the decoded token dict, or None if no token is present.
    Raises 401 if the token is invalid.
    """
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None  # unauthenticated (free tier allowed)
    token = auth_header.split(" ", 1)[1]
    try:
        return auth.verify_id_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token.")
