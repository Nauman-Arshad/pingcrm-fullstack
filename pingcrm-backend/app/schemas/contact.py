from pydantic import BaseModel
from app.schemas.company import Company

class ContactBase(BaseModel):
    name: str
    phone: str
    city: str
    company_id: int

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    id: int
    company: Company

    class Config:
        orm_mode = True
