from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from modules.database import get_db
import modules.schemas.user as schemas
import modules.crud.user as crud
from modules.utils import check_teacher_or_admin

groups_router = APIRouter()


@groups_router.get("/", response_model=list[schemas.StudentGroupBase], name="[TEACHER/ADMIN]Получить список всех групп")
def get_groups(db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    groups = crud.get_groups(db)
    return groups


@groups_router.get("/with_users", response_model=list[schemas.StudentGroupWithStudents], name="[TEACHER/ADMIN]Получить список всех групп")
def get_groups_with_users(db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    groups = crud.get_groups(db)
    return groups


@groups_router.get("/get_by_id/{group_id}", response_model=schemas.StudentGroupBase, name="[TEACHER/ADMIN]Получить инфо о группе по id")
def get_group_by_id(group_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    groups = crud.get_group_by_id(db, group_id)
    return groups


@groups_router.get("/get_by_name/{name}", response_model=schemas.StudentGroupBase, name="[TEACHER/ADMIN] Получить инфо о группе по имени")
def get_group_by_name(name: str, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    groups = crud.get_group_by_name(db, name)
    return groups


@groups_router.post("/create", response_model=schemas.StudentGroupBase, name="[TEACHER/ADMIN] Создать группу")
def create_new_group(group: schemas.StudentGroupCreate, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    db_user = crud.get_group_by_name(db, group.name)
    if db_user:
        raise HTTPException(status_code=400, detail="Group already exists")
    return crud.create_group(db, group.name)


@groups_router.delete("/{group_id}", response_model=schemas.StudentGroupBase, name="[TEACHER/ADMIN] Удалить группу")
def delete_group(group_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.delete_group_by_id(db, group_id)


@groups_router.put("/{group_id}", response_model=schemas.StudentGroupBase, name="[TEACHER/ADMIN] Обновить данные группы")
def update_group(group_id: int, group_data: schemas.StudentGroupEdit, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.update_group_by_id(db, group_id, group_data)


@groups_router.post("/add/{group_id}/{user_id}", name="[TEACHER/ADMIN] Добавить пользователя(ей) в группу")
def add_students_to_group(group_id: int, user_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.add_user_to_group(db, group_id, user_id)
