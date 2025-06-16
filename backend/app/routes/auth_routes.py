from flask import Blueprint, request, jsonify
from app import db
from app.models import Usuario

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nombre = data.get('nombre')
    correo = data.get('correo')
    password = data.get('password')
    rol = data.get('rol')

    if Usuario.query.filter_by(correo=correo).first():
        return jsonify({"error": "Correo ya registrado"}), 400

    nuevo_usuario = Usuario(nombre=nombre, correo=correo, rol=rol)
    nuevo_usuario.set_password(password)
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"message": "Usuario registrado correctamente"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('correo')
    password = data.get('password')

    usuario = Usuario.query.filter_by(correo=correo).first()

    if not usuario or not usuario.check_password(password):
        return jsonify({"error": "Credenciales inválidas"}), 401

    return jsonify({
        "message": "Inicio de sesión exitoso",
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "correo": usuario.correo,
            "rol": usuario.rol
        }
    }), 200
