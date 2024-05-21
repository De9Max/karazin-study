from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from modules.crud import tasks
from modules.database import Base

course_teacher_association = Table('course_teacher_association', Base.metadata,
                                   Column('course_id', Integer, ForeignKey('courses.id'), primary_key=True),
                                   Column('user_id', Integer, ForeignKey('users.id'), primary_key=True)
                                   )

course_group_association = Table('course_group_association', Base.metadata,
                                 Column('course_id', Integer, ForeignKey('courses.id'), primary_key=True),
                                 Column('group_id', Integer, ForeignKey('student_groups.id'), primary_key=True)
                                 )


class Course(Base):
    __tablename__ = 'courses'

    id = Column(Integer, primary_key=True, autoincrement=True, comment='Уникальный айди курса')
    name = Column(String(100), nullable=False, unique=False, comment='Имя курса')
    description = Column(String(500), nullable=False, unique=False, comment='Описание курса')
    image_id = Column(Integer, ForeignKey('files.id'), nullable=False, comment='ИД картинки')
    image = relationship('File', back_populates="course")
    teachers = relationship('User', secondary=course_teacher_association, backref="courses_taught")
    groups = relationship('StudentGroup', secondary=course_group_association, backref='courses')
    tasks = relationship('Task', back_populates="course")
    created_by_id = Column(Integer, ForeignKey('users.id'))
    created_by = relationship("User", back_populates="created_courses")

    def calculate_score(self, db, user_id):
        course_score = 0
        course_tasks = tasks.get_tasks_for_user_and_course(db, self.id, user_id)
        if course_tasks:
            for course_task in course_tasks:
                if score := course_task["score"]:
                    course_score += score
        return course_score
