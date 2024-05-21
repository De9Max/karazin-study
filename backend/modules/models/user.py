from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from modules.database import Base


class StudentGroup(Base):
    __tablename__ = 'student_groups'

    id = Column(Integer, primary_key=True, autoincrement=True, comment='Уникальный айди группы')
    name = Column(String(100), nullable=False, unique=True, comment='Уникальное имя')
    users = relationship('User', back_populates='usergroup')


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True, comment='Уникальный айди пользователя')
    name = Column(String(50), nullable=False, unique=False, comment='Имя пользователя')
    surname = Column(String(50), nullable=False, unique=False, comment='Фамилия пользователя')
    password = Column(String(32), nullable=False, comment='Пароль пользователя')
    email = Column(String(100), nullable=False, unique=True, comment='Уникальная почта пользователя')
    usergroup_id = Column(Integer, ForeignKey('student_groups.id'), nullable=False, comment='ИД группы')
    usergroup = relationship('StudentGroup', back_populates="users")
    admin = Column(Boolean, nullable=False, default=False, comment='Флаг Админ')
    teacher = Column(Boolean, nullable=False, default=False, comment='Флаг Учителя')
    uploaded_files = relationship("File", back_populates="uploaded_by")
    created_courses = relationship("Course", back_populates="created_by")
    created_tasks = relationship("Task", back_populates="created_by")
    tasks = relationship('Task', secondary='task_user_association', backref='submitted_tasks')
