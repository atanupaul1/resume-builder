# Product Requirements Document (PRD): Resume Builder

## 1. Project Overview
The **Resume Builder** is a modern, web-based application designed to help professional job seekers and students (specifically tailored for IIT-style templates) create high-quality resumes efficiently. It leverages AI to provide smart content suggestions and ensures that every resume follows industry standards for readability and formatting.

## 2. Target Audience
- **University Students (IIT Focus)**: Students requiring clean, standard templates for academic and corporate placements.
- **Job Seekers**: Professionals looking for a quick and simple way to update their resumes.
- **Career Changers**: Users needing AI-driven guidance to bridge the gap between their old and new roles.

## 3. Core Features

### 3.1 Interactive Resume Builder
- **Real-time Editing**: Edit sections like Education, Experience, Skills, and Projects with immediate visual updates.
- **Customizable Layouts**: Drag-and-drop or reorder sections according to career priority.
- **Theming**: Select from curated color schemes, professional fonts, and spacing options.

### 3.2 Template Library
- **Pre-designed Templates**: A collection of templates ranging from "Traditional/Academic" (IIT-style) to "Modern/Creative."
- **Template Thumbnails**: High-quality previews to choose based on the user's role and industry.

### 3.3 AI-Powered Assistance (Gemini AI Integration)
- **Section Enhancer**: Refines user-written content into professional "bullet point" style (STAR method).
- **Auto-Fill from Job Description**: Matches a resume to a specific job description by suggesting relevant keywords and section content.
- **Resume Scoring**: Analyzes the resume for ATS (Applicant Tracking System) friendliness and provides actionable tips.
- **Summary Generator**: Crafts a compelling professional summary based on the provided experience and skills.

### 3.4 Export & Versioning
- **One-Click PDF Export**: High-fidelity PDF generation that preserves formatting.
- **Auto-Save**: Automatic persistence of progress to local or cloud storage.

## 4. Technical Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | [Next.js](https://nextjs.org/) (App Router, Tailwind CSS, TypeScript) |
| **Backend** | [FastAPI](https://fastapi.tiangolo.com/) (Python, SQLModel/SQLAlchemy) |
| **Database** | [SQLite](https://www.sqlite.org/) (Development) / PostgreSQL (Production) |
| **AI Integration** | [Google Gemini AI API](https://ai.google.dev/) |
| **Styling** | Vanilla CSS / Tailored CSS utilities |
| **State Management** | React Context / Local Storage |

## 5. User Journey
1. **Landing Page**: User lands on the home page and clicks "Get Started."
2. **Template Selection**: User picks a template that fits their industry or preference.
3. **Builder Interface**: User starts filling out their personal information, experience, etc.
4. **AI Enhancement**: User selects a section (e.g., Experience) and clicks "Enhance with AI" to polish the language.
5. **Resume Audit**: User runs a "Score My Resume" check to see what's missing (keywords, formatting).
6. **Download**: User exports the final resume as a PDF.

## 6. Functional Requirements
- **FR1**: System must support multiple versions of a single user's resume.
- **FR2**: System must generate a PDF that matches the on-screen preview exactly.
- **FR3**: AI suggestions must be editable by the user.
- **FR4**: Dashboard must allow users to view, edit, and delete their saved resumes.

## 7. Future Roadmap
- **Collaboration Mode**: Shared editing for peer or mentor feedback.
- **LinkedIn Import**: One-click import for existing profile data.
- **Multi-lingual Support**: Allow resume generation in different languages.
- **Job Matching**: Proactively suggest jobs based on the created resume content.
