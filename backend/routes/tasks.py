from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import modules.schemas.tasks as schemas
import modules.crud.tasks as crud
from modules.database import get_db
import modules.crud.user as user_crud
import modules.crud.courses as courses_crud
from modules.utils import check_user, check_teacher_or_admin

tasks_router = APIRouter()


@tasks_router.post("/", response_model=schemas.Task, name="[ADMIN/TEACHER] Создать задание")
async def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    new_task_id = crud.create_task(db, task)
    created_task = schemas.Task(id=new_task_id, **task.dict())
    return created_task


@tasks_router.delete("/{task_id}", name="[TEACHER/ADMIN] Удалить задание")
def delete_task(task_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.delete_task(db, task_id)


@tasks_router.put("/{task_id}", response_model=schemas.TaskWithoutUsers, name="[TEACHER/ADMIN] Обновить информацию задания")
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.update_task(db, task_id, task)


@tasks_router.put("/{task_id}/{user_id}", response_model=schemas.TaskForUser, name="[ADMIN/TEACHER] Установить оценку/статус")
def update_task_for_user(task_id: int, user_id: int, task_data: schemas.TaskUserUpdate,
                         db: Session = Depends(get_db),
                         access=Depends(check_teacher_or_admin)):
    return crud.update_score_status_task(db, task_id, user_id, task_data)


@tasks_router.get("/{course_id}/me", response_model=List[schemas.TaskForUser], name="[USER] Получить МОИ задания по курсу")
def get_tasks_for_me(course_id: int, db: Session = Depends(get_db), user=Depends(check_user)):
    return crud.get_tasks_for_user_and_course(db, course_id, user.id)


@tasks_router.post("/send/{task_id}", response_model=schemas.TaskForUser, name="[USER] Отправить задание на проверку")
def send_task_for_user(task_id: int, user=Depends(check_user), db: Session = Depends(get_db)):
    return crud.send_task(db, task_id, user.id)


@tasks_router.get("/{task_id}", response_model=schemas.TaskWithoutUsers, name="[TEACHER/ADMIN] Получить задание по айди")
def get_task_by_id(task_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.get_task_by_id(db, task_id)


@tasks_router.get("/{task_id}/solved", response_model=schemas.SolvedTasks, name="[TEACHER/ADMIN] Получить решённые задачи по айди задачи")
def solved_tasks(task_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.get_solved_tasks(db, task_id)


@tasks_router.get("/{course_id}/{user_id}", response_model=List[schemas.Task], name="[ADMIN/TEACHER] Получить задания по курсу")
def get_tasks_for_me(course_id: int, user_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.get_tasks_for_user_and_course(db, course_id, user_id)
