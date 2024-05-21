from fastapi import HTTPException
from sqlalchemy.orm import Session, subqueryload

import modules.schemas.courses as schemas
from modules.crud import tasks, files
from modules.models.courses import Course, course_group_association, course_teacher_association
import modules.crud.user as users
from modules.models.user import StudentGroup, User


def get_course_by_id(db: Session, course_id: int):
    return db.query(Course).filter(Course.id == course_id).first()


def get_courses(db: Session):
    res = db.query(Course).options(
        subqueryload(Course.tasks)
    ).all()
    return res


def create_course(db: Session, request: schemas.CourseCreate):
    course = Course(name=request.name, description=request.description)
    if request.teachers:
        for teacher_id in request.teachers:
            user = users.get_user_by_id(db, teacher_id)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            else:
                course.teachers.append(user)
    if request.groups:
        for group_id in request.groups:
            group = users.get_group_by_id(db, group_id)
            if not group:
                raise HTTPException(status_code=404, detail="Group not found")
            else:
                course.groups.append(group)
    if request.image_id:
        image = files.get_file_by_id(db, request.image_id)
        if not image:
            raise HTTPException(status_code=404, detail="Image not found")
        else:
            course.image = image
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


def update_course(db: Session, course_id: int, course: schemas.CourseUpdate):
    db_course = get_course_by_id(db, course_id)
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    update_data = course.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_course, key, value)
    db.commit()
    db.refresh(db_course)
    return db_course


def group_to_course(db: Session, course_id: int, group_id: int, call_type: str):
    course = get_course_by_id(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    group = users.get_group_by_id(db, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    if call_type == "add":
        course.groups.append(group)
        course_tasks = tasks.get_tasks_for_course(db, course_id)
        for task in course_tasks:
            task.students.extend(group.users)
    else:
        course.groups.remove(group)
        course_tasks = tasks.get_tasks_for_course(db, course_id)
        for task in course_tasks:
            for user in group.users:
                task.students.remove(user)
    db.commit()
    db.refresh(course)
    return course


def teacher_to_course(db: Session, course_id: int, teacher_id: int, call_type: str):
    course = get_course_by_id(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    user = users.get_user_by_id(db, teacher_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if call_type == "add":
        course.teachers.append(user)
    else:
        course.teachers.remove(user)
    db.commit()
    db.refresh(course)
    return course


def get_courses_by_group(db: Session, group_id: int, with_marks=False, user_id=None, with_tasks=False):
    courses = db.query(Course).select_from(Course).join(course_group_association).join(StudentGroup).filter(StudentGroup.id == group_id).all()
    if with_tasks:
        courses = courses.options(
            subqueryload(Course.tasks)
        ).all()

    if with_marks:
        for course in courses:
            course.score = course.calculate_score(db, user_id)
    return courses


def get_course_by_id(db: Session, course_id: int):
    courses = db.query(Course).select_from(Course).filter(Course.id == course_id).first()
    return courses


def get_courses_by_teacher(db: Session, teacher_id: int):
    courses = db.query(Course).select_from(Course).join(course_teacher_association).join(User).filter(User.id == teacher_id).all()
    return courses


def delete_course(db: Session, course_id: int):
    course = get_course_by_id(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    course_tasks = tasks.get_tasks_for_course(db, course_id)
    for task in course_tasks:
        tasks.delete_task(db, task.id)
    db.delete(course)
    db.commit()
    return {"Course deleted successfully"}
