from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(mot_de_passe: str):
    return pwd_context.hash(mot_de_passe)
