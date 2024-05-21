from typing import Literal

from pydantic import BaseModel, Field


class Lesson(BaseModel):
    lesson_name: str = Field(default="Название пары", nullable=True)
    lesson_type: str = Field(default="Тип пары", nullable=True)
    teacher: str = Field(default="ФИО Преподователь", nullable=True)
    url: str = Field(default="Ссылка на пару", nullable=True)

    class Config:
        orm_mode = True


class Day(BaseModel):
    first_lesson: Lesson | None = None
    second_lesson: Lesson | None = None
    third_lesson: Lesson | None = None
    fourth_lesson: Lesson | None = None
    fifth_lesson: Lesson | None = None
    six_lesson: Lesson | None = None

    class Config:
        orm_mode = True


class TimeTable(BaseModel):
    MONDAY: Day | None = None
    TUESDAY: Day | None = None
    WEDNESDAY: Day | None = None
    THURSDAY: Day | None = None
    FRIDAY: Day | None = None
    upper_lower_week: str


class GetTimeTable(BaseModel):
    usergroup_id: int
    upper_lower: Literal['current', 'upper', 'lower'] = 'current'
