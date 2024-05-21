from sqlalchemy.orm import Session

from modules.models.files import File


def get_files(db: Session):
    result = db.query(File).all()
    return result if result is not None else []


def get_file_by_name(db: Session, name: str):
    result = db.query(File).filter(File.name == name).first()
    return result

def get_file_by_id(db: Session, file_id: int):
    result = db.query(File).filter(File.id == file_id).first()
    return result


def get_file_by_file_name(db: Session, file_name: str):
    result = db.query(File).filter(File.file_name == file_name).first()
    return result
