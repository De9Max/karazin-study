from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from modules import security
from modules.database import get_db
import modules.crud.user as crud

oauth2_scheme = security.JWTBearer()

def get_week_of_month(date):
    first_day = date.replace(day=1)
    dom = date.day
    adjusted_dom = dom + first_day.weekday()
    return (adjusted_dom - 1) // 7 + 1


def check_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = security.decodeJWT(token)
        email: str = payload.get("email")
        if email is None:
            raise credentials_exception
    except:
        raise credentials_exception
    user = crud.get_user_by_email(db, email)
    if user is None:
        raise credentials_exception
    return user


def check_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = check_user(token, db)

    if not user.admin:
        raise HTTPException(status_code=403, detail="You are not admin")

    return user


def check_teacher_or_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = check_user(token, db)

    if not user.teacher and not user.admin:
        raise HTTPException(status_code=403, detail="You are not teacher/admin")

    return user
