from modules.models.tasks import TaskStatus
from modules.schemas.user import User
from pydantic import BaseModel
from typing import List, Optional


class TaskBase(BaseModel):
    name: str
    description: str
    max_score: int


class TaskCreate(TaskBase):
    course_id: int


class TaskUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    max_score: Optional[int] = None


class TaskUserUpdate(BaseModel):
    state: Optional[TaskStatus] = None
    score: Optional[int] = None


class TaskInDB(TaskBase):
    id: int

    class Config:
        orm_mode = True


class Task(TaskInDB):
    students: Optional[List[User]] = []

    class Config:
        orm_mode = True


class TaskWithoutUsers(TaskInDB):
    class Config:
        orm_mode = True


class TaskForUser(TaskInDB):
    state: str
    score: Optional[int]


class SolvedTask(BaseModel):
    user: User
    user_score: Optional[int] = 0
    user_state: str


class SolvedTasks(BaseModel):
    task_info: TaskWithoutUsers
    tasks: List[SolvedTask]
