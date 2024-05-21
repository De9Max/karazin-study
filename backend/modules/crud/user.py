from fastapi import Depends, HTTPException
from sqlalchemy import or_, func
from sqlalchemy.orm import Session
from modules.models.user import User, StudentGroup
import modules.schemas.user as schemas
import modules.crud.courses as courses


def create_user(db: Session, user: User):
    db_user = User(name=user.name, surname=user.surname, email=user.email, password=user.password, admin=False, teacher=False, usergroup_id=1)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_group(db: Session, name: str):
    db_group = StudentGroup(name=name)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group


def get_users(db: Session, skip: int = 0, limit: int = 10, params=schemas.ItemQueryParams):
    query = db.query(User)
    if params.query:
        query_filter = or_(
            func.lower(User.name).contains(params.query.lower()),
            func.lower(User.surname).contains(params.query.lower())
        )
        users = query.filter(query_filter).offset(skip).limit(limit).all()
        has_next = query.filter(query_filter).offset(skip + limit).limit(1).all()
    else:
        users = query.offset(skip).limit(limit).all()
        has_next = query.offset(skip + limit).limit(1).all()
    return users, bool(has_next)


def get_teachers(db: Session):
    users = db.query(User).filter(User.teacher == True).all()
    return users


def get_groups(db: Session):
    return db.query(StudentGroup).order_by(StudentGroup.id).all()


def get_group_by_id(db: Session, group_id: int):
    return db.query(StudentGroup).filter(StudentGroup.id == group_id).first()


def get_group_by_name(db: Session, name: str):
    return db.query(StudentGroup).filter(StudentGroup.name == name).first()


def delete_group_by_id(db: Session, id: int):
    db_group = db.query(StudentGroup).filter(StudentGroup.id == id).first()
    db.delete(db_group)
    db.commit()
    return db_group


def update_group_by_id(db: Session, group_id: int, group_data: schemas.StudentGroupEdit):
    db_group = get_group_by_id(db, group_id)
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")

    for var, value in vars(group_data).items():
        setattr(db_group, var, value)
    db.commit()
    db.refresh(db_group)
    return db_group


def add_user_to_group(db: Session, group_id: int, user_id):
    db_group = get_group_by_id(db, group_id)
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")

    db_user = check_user_exist_by_id(db, user_id)
    if db_user.usergroup == db_group:
        raise HTTPException(status_code=400, detail="User already in this group")
    db_user.usergroup = db_group

    for course in courses.get_courses_by_group(db, group_id):
        tasks = course.tasks
        for task in tasks:
            task.students.append(db_user)

    db.commit()
    db.refresh(db_group)
    return {"User added to group successfully"}


def update_user_by_id(db: Session, user_id: int, user_data: schemas.UserEditSchema):
    db_user = check_user_exist_by_id(db, user_id)

    for var, value in vars(user_data).items():
        setattr(db_user, var, value)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    db_user = check_user_exist_by_id(db, user_id)
    db.delete(db_user)
    db.commit()
    return {"User deleted"}


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def check_user_exist_by_email(db: Session, user: User):
    return False if get_user_by_email(db, user.email) is None else True


def check_user_exist_by_id(db: Session, user_id: int):
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def verify_password(plain_password, hashed_password):
    return plain_password == hashed_password
