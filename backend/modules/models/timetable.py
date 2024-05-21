from enum import Enum
import sqlalchemy
from sqlalchemy import Table, Integer, Column, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy.util.preloaded import orm
from modules.database import Base


class DayEnum(Enum):
    MONDAY = 'Понеділок'
    TUESDAY = 'Вівторок'
    WEDNESDAY = 'Середа'
    THURSDAY = 'Четверг'
    FRIDAY = 'П\'ятниця'


class WeekEnum(Enum):
    UPPER = 'Верхня'
    LOWER = 'Нижня'


class TimeTable_Lesson(Base):
    __tablename__ = 'timetable_lessons'

    id = Column(Integer, primary_key=True, autoincrement=True, comment='Айди пары')
    lesson_name = Column(String(50), nullable=False, unique=False, comment='Название пары')
    lesson_type = Column(String(50), nullable=False, unique=False, comment='Тип пары')
    teacher = Column(String(32), nullable=False, comment='ФИО преподавателя')
    url = Column(String(32), nullable=False, comment='Ссылка на пару')
    usergroup_id = Column(Integer, ForeignKey('student_groups.id'), nullable=False, comment='ИД группы')
    usergroup = relationship('StudentGroup')


class TimeTable_Day(Base):
    __tablename__ = 'timetable_days'
    id = Column(Integer, primary_key=True, autoincrement=True, comment='Айди дня')
    day = Column(sqlalchemy.Enum(DayEnum), nullable=False, comment='День недели')
    first_lesson_id = Column(Integer, ForeignKey('timetable_lessons.id'), nullable=True, comment='ИД пары')
    first_lesson = relationship('TimeTable_Lesson', foreign_keys=first_lesson_id)
    second_lesson_id = Column(Integer, ForeignKey('timetable_lessons.id'), nullable=True, comment='ИД пары')
    second_lesson = relationship('TimeTable_Lesson', foreign_keys=second_lesson_id)
    third_lesson_id = Column(Integer, ForeignKey('timetable_lessons.id'), nullable=True, comment='ИД пары')
    third_lesson = relationship('TimeTable_Lesson', foreign_keys=third_lesson_id)
    fourth_lesson_id = Column(Integer, ForeignKey('timetable_lessons.id'), nullable=True, comment='ИД пары')
    fourth_lesson = relationship('TimeTable_Lesson', foreign_keys=fourth_lesson_id)
    fifth_lesson_id = Column(Integer, ForeignKey('timetable_lessons.id'), nullable=True, comment='ИД пары')
    fifth_lesson = relationship('TimeTable_Lesson', foreign_keys=fifth_lesson_id)
    six_lesson_id = Column(Integer, ForeignKey('timetable_lessons.id'), nullable=True, comment='ИД пары')
    six_lesson = relationship('TimeTable_Lesson', foreign_keys=six_lesson_id)
    upper_lower_week = Column(sqlalchemy.Enum(WeekEnum), comment='Верх/нижняя неделя')
    usergroup_id = Column(Integer, ForeignKey('student_groups.id'), nullable=False, comment='ИД группы')
    usergroup = relationship('StudentGroup')

    @orm.validates('day_id')
    def validate_day(self, key, value):
        if value not in DayEnum:
            raise ValueError(f'Invalid day {value}')
        return value
