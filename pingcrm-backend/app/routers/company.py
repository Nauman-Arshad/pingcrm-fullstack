from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.company import Company as CompanyModel
from app.schemas.company import CompanyCreate, Company

router = APIRouter()


@router.get("/", response_model=list[Company])
def list_companies(db: Session = Depends(get_db)):
    return db.query(CompanyModel).all()


@router.post("/", response_model=Company)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    new_company = CompanyModel(**company.dict())
    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return new_company


@router.get("/{company_id}", response_model=Company)
def get_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).get(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company


@router.put("/{company_id}", response_model=Company)
def update_company(company_id: int, company: CompanyCreate, db: Session = Depends(get_db)):
    existing = db.query(CompanyModel).get(company_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Company not found")

    for key, value in company.dict().items():
        setattr(existing, key, value)
    db.commit()
    db.refresh(existing)
    return existing


@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).get(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    db.delete(company)
    db.commit()
    return {"detail": "Company deleted"}