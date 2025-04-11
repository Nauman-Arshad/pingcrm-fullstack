from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import contact, company
from app.database import engine
from app import models

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/contacts", tags=["contacts"])
app.include_router(company.router, prefix="/companies", tags=["companies"])
