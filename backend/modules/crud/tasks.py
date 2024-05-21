from fastapi import HTTPException
from sqlalchemy.orm import Session

from modules.models.tasks import Task, TaskUserAssociation, TaskStatus
from modules.schemas.tasks import TaskCreate, TaskUserUpdate, TaskUpdate
import modules.crud.courses as courses
import modules.crud.user as users


def get_task_for_user(db: Session, task_id: int, user_id: int):
    task = db.query(Task).filter(Task.id == task_id).filter(Task.students.any(id=user_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    association = (
        db.query(TaskUserAssociation)
        .filter_by(task_id=task.id, user_id=user_id)
        .first()
    )
    task_info = {
        'id': task.id,
        'name': task.name,
        'description': task.description,
        'max_score': task.max_score,
        'date': task.date,
        'score': association.user_score,
        'state': association.user_state
    }
    return task_info


def get_task_by_id(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


def set_value_in_association_state(db: Session, association: TaskUserAssociation, key: str, value: any):
    if not association:
        raise HTTPException(status_code=400, detail="User is not assigned to this task")
    if hasattr(association, key):
        setattr(association, key, value)
    else:
        raise HTTPException(status_code=400, detail=f"Attribute '{key}' does not exist in TaskUserAssociation")

    db.commit()
    db.refresh(association)


def get_tasks_for_user_and_course(db: Session, course_id: int, user_id: int):
    user = users.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    course = courses.get_course_by_id(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    tasks = db.query(Task).filter(Task.course_id == course_id).filter(Task.students.any(id=user_id)).all()
    tasks_info = []

    for task in tasks:
        task_info = get_task_for_user(db, task.id, user_id)
        tasks_info.append(task_info)
    return tasks_info


def get_tasks_for_course(db: Session, course_id: int):
    course = courses.get_course_by_id(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    tasks = db.query(Task).filter(Task.course_id == course_id).all()
    return tasks


def create_task(db: Session, task_data: TaskCreate):
    if course := courses.get_course_by_id(db, task_data.course_id):
        if task_data.max_score > 100:
            raise HTTPException(400, "Max_score can' be more than 100")
        groups = course.groups
        new_task = Task(**task_data.dict())
        db.add(new_task)
        for group in groups:
            for user in group.users:
                new_task.students.append(user)
        db.commit()
        db.refresh(new_task)
        return new_task.id
    else:
        raise HTTPException(404, "Course not found")


def update_score_status_task(db: Session, task_id: int, user_id: int, task_data: TaskUserUpdate):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    association = db.query(TaskUserAssociation).filter_by(task_id=task.id, user_id=user_id).first()

    if not association:
        raise HTTPException(status_code=400, detail="User is not assigned to this task")
    if task_data.score:
        set_value_in_association_state(db, association, "user_score", task_data.score)
    if task_data.state:
        set_value_in_association_state(db, association, "user_state", task_data.state)

    return get_task_for_user(db, task_id, user_id)


def update_task(db: Session, task_id: int, task_data: TaskUpdate):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    updated_data = task_data.dict(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    try:
        db.query(TaskUserAssociation).filter(TaskUserAssociation.task_id == task_id).delete()
        db.delete(task)
        db.commit()
        return {"Task deleted successfully"}
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to delete task due to integrity constraint violation")


def send_task(db: Session, task_id: int, user_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    association = db.query(TaskUserAssociation).filter_by(task_id=task.id, user_id=user_id).first()

    if not association:
        raise HTTPException(status_code=400, detail="User is not assigned to this task")

    set_value_in_association_state(db, association, "user_state", TaskStatus.SEND)

    return get_task_for_user(db, task_id, user_id)


def get_solved_tasks(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    completed_tasks = (
        db.query(TaskUserAssociation)
        .filter_by(task_id=task.id, user_state=TaskStatus.SEND)
        .all()
    )
    response = {
        "task_info": task,
        "tasks": []
    }
    for complete in completed_tasks:
        response["tasks"].append(complete)
    return response
