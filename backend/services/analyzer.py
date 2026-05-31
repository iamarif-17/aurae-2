import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Braces inside the Schema are now escaped (doubled)
PROMPT_TEMPLATE = """You are an expert resume analyst. Analyze the provided resume{jd_context}.
Return ONLY a valid JSON object following this schema. Do not include markdown or explanations.

Schema:
{{
  "overallScore": "integer 0-100",
  "atsScore": "integer 0-100",
  "sections": {{"Contact": 0, "Summary": 0, "Experience": 0, "Skills": 0, "Education": 0}},
  "strengths": ["string"],
  "improvements": ["string"],
  "keywords": ["string"],
  "missingKeywords": ["string"],
  "summary": "string"
}}

Resume Content:
{resume_text}

{jd_section}"""

def analyze_resume(resume_text: str, job_description: str = "") -> dict:
    jd_context = " against the provided job description" if job_description else ""
    jd_section = f"Job Description:\n{job_description}" if job_description else ""

    # Python will now correctly replace {jd_context}, {resume_text}, and {jd_section}
    # while ignoring the escaped {{ }} braces in the schema.
    prompt = PROMPT_TEMPLATE.format(
        jd_context=jd_context,
        resume_text=resume_text[:4000],
        jd_section=jd_section,
    )

    # Force the model to output strict JSON
    response = _client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={"response_mime_type": "application/json"}
    )
    
    return json.loads(response.text)