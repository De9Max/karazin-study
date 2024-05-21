from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from modules.database import get_db
import modules.schemas.user as schemas
import modules.crud.user as crud
from modules.utils import check_teacher_or_admin

user_router = APIRouter()


@user_router.get("/get_list", response_model=schemas.Users, name="[TEACHER/ADMIN] Получить список пользователей")
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), params: schemas.ItemQueryParams = Depends(),
               access=Depends(check_teacher_or_admin)):
    users, has_next = crud.get_users(db, skip=skip, limit=limit, params=params)
    return {"users": users, "has_next": has_next}


@user_router.get("/teachers", response_model=list[schemas.User], name="[TEACHER/ADMIN] Получить список учителей")
def read_teachers(db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    users = crud.get_teachers(db)
    return users


@user_router.get("/get_by_id/{user_id}", response_model=schemas.User, name="[TEACHER/ADMIN] Получить пользователя по id")
def read_user(user_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@user_router.put("/{user_id}", response_model=schemas.User, name="[TEACHER/ADMIN] Обновить информацию пользователя")
def update_user(user_id: int, user: schemas.UserEditSchema, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    user = crud.update_user_by_id(db, user_id, user)
    return user


@user_router.delete("/{user_id}", name="[TEACHER/ADMIN] Удалить пользователя")
def delete_user(user_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.delete_user(db, user_id)
