import datetime
from enum import Enum
import sqlalchemy
from sqlalchemy import Column, Integer, String, ForeignKey,CheckConstraint, DateTime
from sqlalchemy.orm import relationship
from modules.database import Base


class TaskStatus(Enum):
    CREATED = 'Призначено'
    SEND = 'Відправлено на перевірку'
    GRADED = 'Оцінено'


class TaskUserAssociation(Base):
    __tablename__ = 'task_user_association'

    id = Column(Integer, autoincrement=True, primary_key=True)
    task_id = Column(ForeignKey('tasks.id'), nullable=False, primary_key=True)
    user_id = Column(ForeignKey('users.id'), nullable=False, primary_key=True)
    task = relationship('Task', backref='task_user_associations', foreign_keys=task_id)
    user = relationship('User', backref='task_user_associations', foreign_keys=user_id)
    user_score = Column(Integer, nullable=True, comment='Оценка задания пользователя')
    user_state = Column(sqlalchemy.Enum(TaskStatus), nullable=False, comment='Состояние задания пользователя')


class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, autoincrement=True, comment='Уникальный айди задания')
    course_id = Column(Integer, ForeignKey('courses.id'), nullable=False, comment='ИД курса')
    course = relationship("Course", back_populates="tasks")

    name = Column(String(100), nullable=False, unique=False, comment='Имя задания')
    description = Column(String(500), nullable=False, unique=False, comment='Описание задания')
    max_score = Column(Integer, nullable=False, unique=False, comment='Максимальная оценка')
    date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow, comment='Дата создания задания')

    created_by_id = Column(Integer, ForeignKey('users.id'))
    created_by = relationship("User", back_populates="created_tasks")

    students = relationship('User', secondary='task_user_association', backref='submitted_tasks')
    __table_args__ = (
        CheckConstraint('max_score >= 0 AND max_score <= 100', name='check_max_score'),
    )
