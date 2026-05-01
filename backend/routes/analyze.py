from fastapi import APIRouter, UploadFile, File, Form, Request, HTTPException
from services.analyzer import analyze_resume
from services.parser import extract_text_from_pdf
import traceback

router = APIRouter(prefix="/analyze", tags=["analyze"])

@router.post("/")
async def analyze_file_endpoint(request: Request, resume: UploadFile = File(...), job_description: str = Form(default="")):
    try:
        file_bytes = await resume.read()
        if resume.content_type == "application/pdf":
            resume_text = extract_text_from_pdf(file_bytes)
        else:
            resume_text = file_bytes.decode("utf-8", errors="ignore")
        return analyze_resume(resume_text, job_description)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/text")
async def analyze_text_endpoint(request: Request, body: dict):
    try:
        return analyze_resume(body.get("resume_text",""), body.get("job_description",""))
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
def health():
    return {"status": "ok"}
