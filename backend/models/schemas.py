from pydantic import BaseModel
from typing import Optional


class TextAnalyzeRequest(BaseModel):
    resume_text: str
    job_description: Optional[str] = ""


class SectionScores(BaseModel):
    Contact: int
    Summary: int
    Experience: int
    Skills: int
    Education: int


class AnalysisResponse(BaseModel):
    overallScore:     int
    atsScore:         int
    sections:         SectionScores
    strengths:        list[str]
    improvements:     list[str]
    keywords:         list[str]
    missingKeywords:  list[str]
    summary:          str
