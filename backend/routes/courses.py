from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from modules.database import get_db
import modules.schemas.courses as schemas
import modules.crud.courses as crud
from modules.utils import check_admin, check_teacher_or_admin, check_user

courses_router = APIRouter()


@courses_router.get("/my", response_model=list[schemas.CourseForUser], name="[USER]Получить список моих курсов(как ученик)")
def get_my_courses(db: Session = Depends(get_db), user=Depends(check_user)):
    courses = crud.get_courses_by_group(db, user.usergroup_id, with_marks=True, user_id=user.id)
    return courses


@courses_router.get("/{course_id}", response_model=schemas.Course, name="[USER] Получить курс по айди")
def get_course_by_id(course_id: int, db: Session = Depends(get_db), user=Depends(check_user)):
    return crud.get_course_by_id(db, course_id)


@courses_router.get("/", response_model=list[schemas.CourseWithTasks], name="[ADMIN]Получить список всех курсов")
def get_courses(db: Session = Depends(get_db), admin=Depends(check_admin)):
    courses = crud.get_courses(db)
    return courses


@courses_router.get("/get_by_group/{group_id}", response_model=list[schemas.Course], name="[TEACHER/ADMIN]Получить список курсов по айди группы")
def get_group_courses(group_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    courses = crud.get_courses_by_group(db, group_id)
    return courses


@courses_router.get("/get_by_teacher/{teacher_id}", response_model=list[schemas.Course], name="[TEACHER/ADMIN]Получить список курсов по айди учителя")
def get_teacher_courses(teacher_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    courses = crud.get_courses_by_teacher(db, teacher_id)
    return courses


@courses_router.post("/create", response_model=schemas.Course, name="[TEACHER/ADMIN] Создать курс")
def create_new_group(request: schemas.CourseCreate, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.create_course(db, request)


@courses_router.put("/{course_id}", response_model=schemas.Course, name="[TEACHER/ADMIN] Обновить информацию курса")
def update_course(course_id: int, course: schemas.CourseUpdate, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.update_course(db, course_id, course)


@courses_router.delete("/{course_id}", name="[TEACHER/ADMIN] Удалить курс")
def delete_course(course_id: int, db: Session = Depends(get_db), access=Depends(check_teacher_or_admin)):
    return crud.delete_course(db, course_id)


@courses_router.post("/{course_id}/{action_type}/{spec_type}/{spec_id}", response_model=schemas.Course,
                     name="[TEACHER/ADMIN]Добавить/удалить учителя/группу на курс")
def add_spec_to_course(course_id: int, action_type: str, spec_type: str, spec_id: int, db: Session = Depends(get_db),
                       access=Depends(check_teacher_or_admin)):
    if action_type not in ["add", "remove"]:
        raise HTTPException(status_code=404, detail="Unknown action type (add/remove)")
    if spec_type == "teacher":
        return crud.teacher_to_course(db, course_id, spec_id, action_type)
    elif spec_type == "group":
        return crud.group_to_course(db, course_id, spec_id, action_type)
    else:
        raise HTTPException(status_code=404, detail="Unknown spec type (teacher/group)")
