from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.contact import Contact as ContactModel
from app.models.company import Company as CompanyModel
from app.schemas.contact import ContactCreate, Contact

router = APIRouter()


@router.get("/", response_model=list[Contact])
def list_contacts(
    db: Session = Depends(get_db),
    search: str = Query(None),
    company_id: int = Query(None)
):
    query = db.query(ContactModel)
    if search:
        query = query.filter(ContactModel.name.ilike(f"%{search}%"))
    if company_id:
        query = query.filter(ContactModel.company_id == company_id)
    return query.all()


@router.post("/", response_model=Contact)
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    company = db.query(CompanyModel).get(contact.company_id)
    if not company:
        raise HTTPException(status_code=400, detail="Invalid company ID")
    
    new_contact = ContactModel(**contact.dict())
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact


@router.get("/{contact_id}", response_model=Contact)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = db.query(ContactModel).get(contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.put("/{contact_id}", response_model=Contact)
def update_contact(contact_id: int, contact: ContactCreate, db: Session = Depends(get_db)):
    existing = db.query(ContactModel).get(contact_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Contact not found")

    for key, value in contact.dict().items():
        setattr(existing, key, value)
    db.commit()
    db.refresh(existing)
    return existing


@router.delete("/{contact_id}")
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = db.query(ContactModel).get(contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    db.delete(contact)
    db.commit()
    return {"detail": "Contact deleted"}