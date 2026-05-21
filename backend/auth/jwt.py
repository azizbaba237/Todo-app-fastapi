from datetime import datetime, timedelta, timezone
from jose import jwt


SECREWT_KEY = "cle super secrete"
ALGORITHM = "HS256"
ACCESS_EXPIRE_MINUTES = 5


def create_access_token(data: dict):
    to_encode = data.copy()
    expire  = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECREWT_KEY, algorithm=ALGORITHM)