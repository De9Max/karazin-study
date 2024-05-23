import json
import time

from sqlalchemy import insert

from modules.crud import courses
from modules.database import SessionLocal
from modules.models.courses import Course, course_teacher_association
from modules.models.files import File
from modules.models.tasks import Task
from modules.models.timetable import TimeTable_Lesson, TimeTable_Day
from modules.models.user import StudentGroup, User


def init_students():
    with SessionLocal() as db:
        groups = json.load(open("standard_data/groups.json", "r", encoding='utf-8'))
        db.execute(insert(StudentGroup.__table__), groups)
        users = json.load(open("standard_data/users.json", "r", encoding='utf-8'))
        db.execute(insert(User.__table__), users)
        db.commit()
        db.close()


def init_courses():
    with SessionLocal() as db:
        files = json.load(open("standard_data/files.json", "r", encoding='utf-8'))
        db.execute(insert(File.__table__), files)
        course_list = json.load(open("standard_data/courses.json", "r", encoding='utf-8'))
        db.execute(insert(Course.__table__), course_list)
        db.commit()
        db.close()


def init_tasks():
    with SessionLocal() as db:
        task_list = json.load(open("standard_data/course_tasks.json", "r", encoding='utf-8'))
        db.execute(insert(Task.__table__), task_list)
        course_group = [
            [1, 2],
            [1, 3],
            [2, 2],
            [2, 3],
            [3, 2],
            [3, 3],
            [4, 2],
            [4, 3]
        ]
        for group in course_group:
            courses.group_to_course(db, group[0], group[1], "add")

        course_teacher = [
            {
                "course_id": 1,
                "user_id": 9,
            },
            {
                "course_id": 2,
                "user_id": 10,
            },
            {
                "course_id": 2,
                "user_id": 11,
            },
            {
                "course_id": 3,
                "user_id": 12,
            },
            {
                "course_id": 4,
                "user_id": 9,
            },
            {
                "course_id": 5,
                "user_id": 4,
            },
            {
                "course_id": 6,
                "user_id": 2,
            },
        ]
        db.execute(insert(course_teacher_association), course_teacher)
        db.commit()
        db.close()


def init_timetable():
    with SessionLocal() as db:
        lessons = json.load(open("standard_data/timetable_lessons.json", "r", encoding='utf-8'))
        db.execute(insert(TimeTable_Lesson.__table__), lessons)
        days = json.load(open("standard_data/timetable_days.json", "r", encoding='utf-8'))
        db.execute(insert(TimeTable_Day.__table__), days)
        db.commit()
        db.close()
