from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import modules.crud.user as crud
from modules.database import get_db
from modules.models.user import User
from modules.security import signJWT, JWTBearer
import modules.schemas.user as schemas
from modules.utils import check_user, oauth2_scheme

auth_router = APIRouter()


@auth_router.post("/register", response_model=schemas.User, name="Регистрация пользователя")
def register_auth(user: schemas.UserRegisterSchema, db: Session = Depends(get_db)):
    db_user = crud.check_user_exist_by_email(db, user)
    if db_user:
        raise HTTPException(status_code=400, detail="Пользователь с такой почтой уже зарегестрирован!")
    return crud.create_user(db=db, user=user)


@auth_router.post("/login", name="Авторизация пользователя", response_model=schemas.UserLoginResponse)
async def login_auth(user: schemas.UserLoginSchema, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, user.email, user.password)
    if not user:
        raise HTTPException(status_code=401, detail="Неверная почта или пароль!")
    return {"access_token": signJWT(user.email)["access_token"], "user": user}


@auth_router.get("/verify", response_model=schemas.User, name="Получить инфу о пользователе")
async def read_me(user: User = Depends(check_user), db: Session = Depends(get_db)):
    return user
