# backend/models.py
from typing import List, Optional, Dict, Any
from sqlmodel import SQLModel, Field, JSON, Column
from pydantic import BaseModel

class ResumeThemeModel(BaseModel):
    fontFamily: str
    primaryColor: str
    fontSize: str
    spacing: str

class ResumeSectionModel(BaseModel):
    id: str
    type: str # experience | education | skills | summary | contact
    title: str
    content: str
    position_x: float = 0
    position_y: float = 0
    order: int

class ResumeDataModel(SQLModel, table=True):
    id: Optional[str] = Field(default=None, primary_key=True)
    title: str
    # SQLModel doesn't natively support nested models in Table mode easily without relationships
    # So we use JSON Column for simplicity as requested by "production-ready" for this scale
    sections: List[Dict[str, Any]] = Field(default=[], sa_column=Column(JSON))
    theme: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    template: str
    createdAt: str
    updatedAt: str

class AIRequestModel(BaseModel):
    sectionId: str
    sectionType: str
    content: str
    targetRole: Optional[str] = None
    jobDescription: Optional[str] = None

class AIResponseModel(BaseModel):
    improved: str
    alternatives: List[str]
    missingKeywords: List[str]
    score: int
    tips: List[str]

class TemplateConfigModel(BaseModel):
    id: str
    name: str
    thumbnail: str
    layout: str
    colorScheme: List[str]
    fontPair: str
    category: str
