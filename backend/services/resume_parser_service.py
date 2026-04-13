import re
import uuid


EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)
PHONE_RE = re.compile(r"(?:(?:\+?\d{1,3}[-\s]?)?(?:\(?\d{3,5}\)?[-\s]?)?\d{3,5}[-\s]?\d{4,})")
LINKEDIN_RE = re.compile(r"(https?://)?(www\.)?linkedin\.com/in/[^\s|,]+", re.IGNORECASE)
GITHUB_RE = re.compile(r"(https?://)?(www\.)?github\.com/[^\s|,]+", re.IGNORECASE)
URL_RE = re.compile(r"(https?://[^\s]+|www\.[^\s]+)")
SKILL_SECTION_RE = re.compile(r"(?is)(skills?|technical skills?|technologies)\s*[:\n-]+(.+?)(?:\n\s*\n|\Z)")


def _clean_line(line: str) -> str:
    return re.sub(r"\s+", " ", line).strip(" |-\t")


def parse_resume_text(text: str) -> dict:
    lines = [_clean_line(line) for line in text.splitlines()]
    lines = [line for line in lines if line]

    full_name = lines[0] if lines and len(lines[0].split()) <= 6 else ""
    email_match = EMAIL_RE.search(text)
    phone_match = PHONE_RE.search(text)
    linkedin_match = LINKEDIN_RE.search(text)
    github_match = GITHUB_RE.search(text)

    website = ""
    for match in URL_RE.finditer(text):
        url = match.group(0)
        lower = url.lower()
        if "linkedin.com" not in lower and "github.com" not in lower:
            website = url
            break

    summary = ""
    content_lines = [line for line in lines[1:] if line.lower() not in {"resume", "curriculum vitae", "cv"}]
    if content_lines:
        summary_lines = []
        for line in content_lines:
            lower = line.lower()
            if any(keyword in lower for keyword in ["experience", "education", "skills", "projects", "certifications"]):
                break
            summary_lines.append(line)
            if len(" ".join(summary_lines)) > 280:
                break
        summary = " ".join(summary_lines[:3]).strip()

    skill_groups = []
    
    # Better extraction logic by chunking text into sections
    section_headers = {
        "experience": re.compile(r"^(experience|work experience|employment history|work history|professional experience)$", re.IGNORECASE),
        "education": re.compile(r"^(education|academic background|academics)$", re.IGNORECASE),
        "skills": re.compile(r"^(skills|technical skills|technologies|core competencies)$", re.IGNORECASE),
    }

    current_section = None
    sections_content = {"experience": [], "education": [], "skills": []}

    for line in lines:
        lower_line = line.lower().strip(":-•= ")
        matched_section = None
        for sec, pattern in section_headers.items():
            if pattern.match(lower_line):
                matched_section = sec
                break
        
        if matched_section:
            current_section = matched_section
            continue
        
        if current_section and line.strip():
            sections_content[current_section].append(line)

    work_experience = []
    if sections_content["experience"]:
        exp_text = "\n".join(sections_content["experience"])
        # Split roughly by lines that have years or just treat as big chunks
        blocks = re.split(r"(?=\n.*?(?:19|20)\d{2})", exp_text)
        if len(blocks) == 1:
            blocks = re.split(r"\n\s*\n", exp_text)
            
        for block in blocks:
            if not block.strip():
                continue
            block_lines = [l.strip() for l in block.splitlines() if l.strip()]
            if not block_lines:
                continue
            title = block_lines[0][:50]
            desc = " ".join(block_lines[1:]) if len(block_lines) > 1 else block
            work_experience.append({
                "id": str(uuid.uuid4()),
                "company": "Company/Role",
                "role": title,
                "location": "",
                "startDate": "",
                "endDate": "",
                "current": False,
                "bullets": [desc.strip()] if desc.strip() else []
            })


    education = []
    if sections_content["education"]:
        edu_text = "\n".join(sections_content["education"])
        blocks = re.split(r"(?=\n.*?(?:19|20)\d{2})", edu_text)
        if len(blocks) == 1:
            blocks = re.split(r"\n\s*\n", edu_text)
            
        for block in blocks:
            if not block.strip():
                continue
            block_lines = [l.strip() for l in block.splitlines() if l.strip()]
            if not block_lines:
                continue
            degree = block_lines[0][:50]
            school = block_lines[1][:50] if len(block_lines) > 1 else "School"
            education.append({
                "id": str(uuid.uuid4()),
                "institution": school,
                "degree": degree,
                "field": "",
                "location": "",
                "startDate": "",
                "endDate": "",
                "current": False,
                "grade": ""
            })


    if sections_content["skills"]:
        raw_skills = re.split(r"[,\n|•]+", "\n".join(sections_content["skills"]))
        skills = []
        for skill in raw_skills:
            cleaned = _clean_line(skill)
            if cleaned and len(cleaned) < 40:
                skills.append(cleaned)
        if skills:
            skill_groups.append({
                "id": str(uuid.uuid4()),
                "category": "Skills",
                "skills": list(dict.fromkeys(skills))[:20],
            })
    else:
        # Fallback to regex
        skill_match = SKILL_SECTION_RE.search(text)
        if skill_match:
            raw_skills = re.split(r"[,\n|•]+", skill_match.group(2))
            skills = []
            for skill in raw_skills:
                cleaned = _clean_line(skill)
                if cleaned and len(cleaned) < 40:
                    skills.append(cleaned)
            if skills:
                skill_groups.append({
                    "id": str(uuid.uuid4()),
                    "category": "Skills",
                    "skills": list(dict.fromkeys(skills))[:20],
                })

    email = email_match.group(0) if email_match else ""
    phone = phone_match.group(0) if phone_match else ""
    linkedin = linkedin_match.group(0) if linkedin_match else ""
    github = github_match.group(0) if github_match else ""

    return {
        "personalInfo": {
            "fullName": full_name,
            "jobTitle": "",
            "email": email,
            "phone": phone,
            "location": "",
            "linkedin": linkedin,
            "website": website,
        },
        "summary": summary,
        "workExperience": work_experience,
        "education": education,
        "skillGroups": skill_groups,
        "contact": {
            "email": email,
            "phone": phone,
            "location": "",
            "linkedin": linkedin,
            "website": website,
            "github": github,
        },
        "rawText": text,
    }
