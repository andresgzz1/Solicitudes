from . import db
from datetime import datetime

from werkzeug.security import generate_password_hash, check_password_hash

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    rol = db.Column(db.String(20), nullable=False)  # 'admin' o 'cliente'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Solicitud(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, nullable=False)
    insumo = db.Column(db.String(100), nullable=False)
    equipo_estandar = db.Column(db.String(100), nullable=True)
    justificacion = db.Column(db.Text, nullable=False)
    jefatura = db.Column(db.String(100), nullable=False)
    observacion = db.Column(db.Text, nullable=True)
    estado = db.Column(db.String(50), default="nueva")
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    imagen_insumo = db.Column(db.String(255), nullable=True) 
