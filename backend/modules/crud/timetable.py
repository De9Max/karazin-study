from fastapi import HTTPException
from sqlalchemy import and_
from sqlalchemy.orm import Session
from modules.crud import user
from modules.models.timetable import TimeTable_Day


def get_timetable_by_group_id(db: Session, group_id: int, upper_lower: str):
    if user.get_group_by_id(db, group_id) is None:
        raise HTTPException(status_code=401, detail="Такая група не найдена!")
    result = db.query(TimeTable_Day).filter(and_(TimeTable_Day.usergroup_id == group_id, TimeTable_Day.upper_lower_week == upper_lower)).all()
    return result if result is not None else []
