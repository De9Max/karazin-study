import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from modules.crud.timetable import get_timetable_by_group_id
from modules.models.timetable import WeekEnum
from modules.database import get_db
from modules import utils
import modules.schemas.timetable as schemas
from modules.utils import check_user

timetable_router = APIRouter()


@timetable_router.get("/get_by_group/{usergroup_id}/{upper_lower}", response_model=schemas.TimeTable, name="Получить пары по группе")
def get_by_group(request: schemas.GetTimeTable = Depends(), db: Session = Depends(get_db), user=Depends(check_user)):
    upper_lower = request.upper_lower.upper()
    if upper_lower == "CURRENT":
        current_week = utils.get_week_of_month(datetime.date.today())
        upper_lower = "LOWER" if current_week % 2 == 0 else "UPPER"
    days = get_timetable_by_group_id(db, request.usergroup_id, upper_lower)
    results = {day.day.name: day for day in days}
    results.update({"upper_lower_week": WeekEnum[upper_lower].value})
    return results
