import os
import shutil
import uuid
from typing import List

from fastapi import APIRouter, HTTPException, Depends, UploadFile
from fastapi import File as FastAPIFile
from sqlalchemy.orm import Session
from modules.database import get_db
from modules.models.files import File
from modules.models.user import User
from modules.schemas.files import FileResponse
from modules.utils import check_user
import modules.crud.files as crud

files_router = APIRouter()

UPLOAD_DIRECTORY = 'uploaded_files'


@files_router.delete("/{file_id}")
def delete_File(file_id: int, db: Session = Depends(get_db)):
    db_File = db.query(File).filter(File.id == file_id).first()
    if db_File is None:
        raise HTTPException(status_code=404, detail="File not found")
    db.delete(db_File)
    db.commit()
    return {"message": "File deleted successfully"}


@files_router.post("/upload")
async def upload_file(img_name: str = uuid.uuid4(),
                      file: UploadFile = FastAPIFile(...),
                      db: Session = Depends(get_db),
                      user: User = Depends(check_user)):
    try:
        file_name, file_ext = os.path.splitext(file.filename)
        if crud.get_file_by_file_name(db, file.filename):
            file.filename = file_name + "_1" + file_ext
        if not os.path.exists(UPLOAD_DIRECTORY):
            os.makedirs(UPLOAD_DIRECTORY)
        with open(os.path.join(UPLOAD_DIRECTORY, file.filename), "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        if crud.get_file_by_name(db, img_name):
            raise HTTPException(status_code=400, detail="Name for file already exists")
        db_file = File(name=img_name, file_name=file.filename, uploaded_by_id=user.id)
        db.add(db_file)
        db.commit()
        db.refresh(db_file)
    finally:
        file.file.close()
    return {"url": f"uploaded/{file.filename}", "id": db_file.id}
