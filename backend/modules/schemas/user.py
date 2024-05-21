from typing import List

from pydantic import BaseModel, EmailStr, Field


class StudentGroupBase(BaseModel):
    id: int
    name: str = Field(min_length=2, default="К*-11")

    class Config:
        orm_mode = True


class User(BaseModel):
    id: int
    name: str = Field(min_length=4, default="Акакий")
    surname: str = Field(min_length=4, default="Морозов")
    email: EmailStr = Field(min_length=5, default="test@mail.net")
    usergroup: StudentGroupBase
    admin: bool = False
    teacher: bool = False

    class Config:
        orm_mode = True


class StudentGroupWithStudents(BaseModel):
    id: int
    name: str = Field(min_length=2, default="К*-11")
    users: List[User]

    class Config:
        orm_mode = True


class Users(BaseModel):
    users: List[User]
    has_next: bool


class StudentGroupResponse(StudentGroupBase):
    id: int
    users: List[User] = []

    class Config:
        orm_mode = True


class StudentGroupCreate(BaseModel):
    name: str = Field(min_length=2, default="К*-11")


class StudentGroupEdit(BaseModel):
    name: str = Field(min_length=2, default="К*-11")


class UserRegisterSchema(BaseModel):
    name: str = Field(min_length=4, default="Акакий")
    surname: str = Field(min_length=4, default="Морозов")
    email: EmailStr = Field(min_length=5, default="test@mail.net")
    password: str = Field(min_length=5, default="very_strong_password")


class UserLoginResponse(BaseModel):
    access_token: str
    user: User


class UserLoginSchema(BaseModel):
    email: str = Field(default="username")
    password: str = Field(default="very_strong_password")


class UserEditSchema(BaseModel):
    teacher:bool = False
    usergroup_id: int = Field(default=1)


class ItemQueryParams(BaseModel):
    query: str = ""
