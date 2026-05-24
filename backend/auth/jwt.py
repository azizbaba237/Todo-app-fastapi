from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt


SECRET_KEY = "cle super secrete"
ALGORITHM = "HS256"
ACCESS_EXPIRE_MINUTES = 1
REFRESH_TOKEN_EXPIRE_DAYS = 15


def create_access_token(data: dict):
    to_encode = data.copy()
    expire  = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        return payload
    
    except JWTError:
        return None
    
    
def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire  = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_refresh_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        return payload
    
    except JWTError:
        return None
    
    