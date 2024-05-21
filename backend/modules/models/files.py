from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from modules.database import Base


class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False, comment='Название')
    file_name = Column(String(100), index=True, nullable=False, comment='Название файла в папке')
    uploaded_by_id = Column(Integer, ForeignKey('users.id'))
    uploaded_by = relationship("User", back_populates="uploaded_files")
    course = relationship("Course", back_populates="image")
