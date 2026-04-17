from sqlmodel import SQLModel, Field, JSON, Column, create_engine, Session
from typing import List, Dict, Any, Optional
import uuid

class TestModel(SQLModel, table=True):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid1()), primary_key=True)
    data: List[Dict[str, Any]] = Field(default=[], sa_column=Column(JSON))

engine = create_engine("sqlite:///:memory:")
SQLModel.metadata.create_all(engine)

with Session(engine) as session:
    m = TestModel(data=[{"key": "value"}])
    session.add(m)
    session.commit()
    session.refresh(m)
    print(f"Success: {m.id}, {m.data}")
