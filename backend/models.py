# backend/models.py
from typing import List, Optional, Dict, Any
from sqlmodel import SQLModel, Field, JSON, Column
from pydantic import BaseModel
import uuid
from datetime import datetime

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
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    title: str = Field(default="Untitled Resume")
    # Using JSON column for flexibility. The tests send dict-like sections.
    sections: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    theme: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    template: str = Field(default="minimal")
    createdAt: str = Field(default_factory=lambda: datetime.now().isoformat())
    updatedAt: str = Field(default_factory=lambda: datetime.now().isoformat())
    
    # Allow extra fields for schema evolution and test payloads
    class Config:
        extra = "allow"

class TemplateConfigModel(BaseModel):
    id: str
    name: str
    thumbnail: str
    layout: str
    colorScheme: List[str]
    fontPair: str
    category: str
