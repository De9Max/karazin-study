from typing import List, Optional

from pydantic import BaseModel

from modules.schemas.tasks import Task, TaskWithoutUsers, TaskForUser
from modules.schemas.files import FileBase, FileResponse
from modules.schemas.user import User, StudentGroupBase


class CourseBase(BaseModel):
    id: int
    name: str
    description: str
    image: FileBase


class CourseCreate(BaseModel):
    name: str
    description: str
    image_id: int
    groups: Optional[List[int]] = []
    teachers: Optional[List[int]] = []


class CourseUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class Course(CourseBase):
    teachers: List[User] = []
    groups: List[StudentGroupBase] = []

    class Config:
        orm_mode = True


class CourseForUser(Course):
    score: int = 0


class CourseWithTasks(Course):
    tasks: List[TaskWithoutUsers] = []
