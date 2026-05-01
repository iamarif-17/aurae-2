import os
import json
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

PROMPT_TEMPLATE = """You are an expert resume analyst. Analyze this resume{jd_context} and return ONLY valid JSON, no markdown, no extra text:

{{"overallScore":78,"atsScore":82,"sections":{{"Contact":90,"Summary":75,"Experience":80,"Skills":85,"Education":90}},"strengths":["strength 1","strength 2","strength 3"],"improvements":["improvement 1","improvement 2","improvement 3","improvement 4"],"keywords":["keyword1","keyword2","keyword3","keyword4","keyword5"],"missingKeywords":["missing1","missing2","missing3"],"summary":"2 sentence overall assessment of the resume."}}

Resume:
{resume_text}

{jd_section}"""


def analyze_resume(resume_text: str, job_description: str = "") -> dict:
    jd_context = " against the provided job description" if job_description else ""
    jd_section = f"Job Description:\n{job_description}" if job_description else ""

    prompt = PROMPT_TEMPLATE.format(
        jd_context=jd_context,
        resume_text=resume_text[:4000],
        jd_section=jd_section,
    )

    response = _client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are an expert resume analyst. Always respond with valid JSON only."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=1024,
        temperature=0.3,
    )

    raw = response.choices[0].message.content.strip()
    raw = re.sub(r"^```[a-z]*\n?", "", raw)
    raw = re.sub(r"\n?```$", "", raw)

    return json.loads(raw)
