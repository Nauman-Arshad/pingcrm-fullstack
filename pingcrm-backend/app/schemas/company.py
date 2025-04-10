from pydantic import BaseModel

class CompanyBase(BaseModel):
    name: str
    city: str | None = None

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    id: int

    class Config:
        orm_mode = True
