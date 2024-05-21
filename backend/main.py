import time

from fastapi import FastAPI
from sqlalchemy import event
from starlette.staticfiles import StaticFiles

from modules.crud import courses
from modules.database import engine, Base, SessionLocal
from modules.models.courses import Course

from routes.auth import auth_router
from routes.courses import courses_router
from routes.files import files_router
from routes.tasks import tasks_router
from routes.timetable import timetable_router
from routes.user import user_router
from routes.groups import groups_router
from fastapi.middleware.cors import CORSMiddleware

from modules.standard_data import init_students, init_courses, init_tasks, init_timetable

tags_metadata = [
    {
        "name": "Users",
        "description": "Операции с пользователями",
    },
    {
        "name": "Groups",
        "description": "Операции с группами студентов",
    },
    {
        "name": "Auth",
        "description": "Сервис авторизации",
    },
]


app = FastAPI(debug=True, openapi_tags=tags_metadata, title="MegaBackend", host="0.0.0.0:5050")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/uploaded", StaticFiles(directory='./uploaded_files'), name="uploaded_files")
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(groups_router, prefix="/groups", tags=["Groups"])
app.include_router(timetable_router, prefix="/timetable", tags=["Timetable"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(files_router, prefix="/files", tags=["Files"])

app.include_router(courses_router, prefix="/courses", tags=["Courses"])
app.include_router(tasks_router, prefix="/tasks", tags=["Tasks"])



@event.listens_for(Base.metadata, 'after_create')
def receive_after_create(target, connection, **kw):
    if kw.get('tables', None):
        init_students()
        init_courses()
        init_tasks()
        init_timetable()

Base.metadata.create_all(bind=engine)

