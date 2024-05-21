from pydantic import BaseModel


class FileBase(BaseModel):
    name: str
    file_name: str


class FileResponse(BaseModel):
    id: int

