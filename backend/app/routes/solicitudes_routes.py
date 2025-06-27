from flask import Blueprint, request, jsonify
from app import db
from app.models import Solicitud, Usuario
from sqlalchemy import not_, or_
from io import BytesIO
import pandas as pd
from flask import send_file
from flask_mail import Message
from app import mail
import os

solicitudes_bp = Blueprint('solicitudes', __name__)



@solicitudes_bp.route('/', methods=['GET'])
def bienvenida_usuario():
    return jsonify({"message": "Bienvenido, usuario!"}), 200


@solicitudes_bp.route('/solicitudes', methods=['POST'])
def crear_solicitud():
    data = request.json
    usuario_id = data.get("usuario_id")

    nueva_solicitud = Solicitud(
        usuario_id=usuario_id,
        insumo=data["insumo"],
        equipo_estandar=data.get("equipo_estandar"),
        justificacion=data["justificacion"],
        jefatura=data["jefatura"],
        observacion=data.get("observacion")
    )
    db.session.add(nueva_solicitud)
    db.session.commit()

    # correo
    usuario = Usuario.query.get(usuario_id)
    destinatario = os.getenv("DESTINATARIO_ALERTAS")

    msg = Message("Nueva Solicitud Recibida", recipients=[destinatario])
    msg.html = f"""
    <h2 style="color: #2a4365;">Nueva Solicitud Recibida</h2>
    <p>Se ha registrado una nueva solicitud con la siguiente información:</p>

    <ul style="font-size: 14px; color: #333;">
    <li><strong>Insumo:</strong> {nueva_solicitud.insumo}</li>
    <li><strong>Equipo Estándar:</strong> {nueva_solicitud.equipo_estandar}</li>
    <li><strong>Justificación:</strong> {nueva_solicitud.justificacion}</li>
    <li><strong>Jefatura:</strong> {nueva_solicitud.jefatura}</li>
    <li><strong>Observación:</strong> {nueva_solicitud.observacion or 'N/A'}</li>
    <li><strong>Usuario:</strong> {usuario.nombre}</li>
    </ul>

    <p style="color: #718096; font-size: 12px;">Este es un correo automático, por favor no responder.</p>
    """


    mail.send(msg)

    return jsonify({"message": "Solicitud registrada correctamente"}), 201


# Obtener todas las solicitudes nuevas
@solicitudes_bp.route('/solicitudes/nuevas', methods=['GET'])
def obtener_solicitudes_nuevas():
    solicitudes = Solicitud.query.filter_by(estado='nueva').all()
    data = []
    for s in solicitudes:
        usuario = Usuario.query.get(s.usuario_id)
        data.append({
            "id": s.id,
            "nombre_usuario": usuario.nombre if usuario else "Desconocido",
            "insumo": s.insumo,
            "fecha_creacion": s.fecha_creacion.strftime("%Y-%m-%d %H:%M"),
        })
    return jsonify(data)

# Obtener detalle por ID
@solicitudes_bp.route('/solicitudes/<int:id>', methods=['GET'])
def detalle_solicitud(id):
    s = Solicitud.query.get_or_404(id)
    return jsonify({
        "id": s.id,
        "usuario_id": s.usuario_id,
        "insumo": s.insumo,
        "equipo_estandar": s.equipo_estandar,
        "justificacion": s.justificacion,
        "jefatura": s.jefatura,
        "observacion": s.observacion,
        "estado": s.estado,
        "fecha_creacion": s.fecha_creacion.strftime("%Y-%m-%d %H:%M")
    })

# Aceptar solicitud (cambiar estado a 'En_curso')
@solicitudes_bp.route('/solicitudes/<int:id>/aceptar', methods=['PUT'])
def aceptar_solicitud(id):
    s = Solicitud.query.get_or_404(id)
    s.estado = "En_curso"
    db.session.commit()
    return jsonify({"message": "Solicitud aceptada"})




@solicitudes_bp.route('/solicitudes/En_curso', methods=['GET'])
def obtener_solicitudes_En_curso():
    estados_visibles = ["En_curso", "PENDIENTE", "PROCESO VALIDACION", "PROCESO GESTION", "ENVIO/ENTREGA"]
    solicitudes = Solicitud.query.filter(Solicitud.estado.in_(estados_visibles)).all()
    
    data = []
    for s in solicitudes:
        usuario = Usuario.query.get(s.usuario_id)
        data.append({
            "id": s.id,
            "insumo": s.insumo,
            "equipo_estandar": s.equipo_estandar,
            "jefatura": s.jefatura,
            "estado": s.estado,
            "fecha_creacion": s.fecha_creacion.strftime("%Y-%m-%d %H:%M"),
            "nombre_usuario": usuario.nombre if usuario else "N/A"
        })
    return jsonify(data)




@solicitudes_bp.route('/solicitudes/<int:id>/estado', methods=['PUT'])
def cambiar_estado_solicitud(id):
    data = request.get_json()
    nuevo_estado = data.get("estado")
    s = Solicitud.query.get_or_404(id)
    s.estado = nuevo_estado
    db.session.commit()
    return jsonify({"message": f"Estado actualizado a {nuevo_estado}"})


@solicitudes_bp.route('/solicitudes/usuario/<int:usuario_id>', methods=['GET'])
def obtener_solicitudes_usuario(usuario_id):
    solicitudes = Solicitud.query.filter(
        Solicitud.usuario_id == usuario_id,
        Solicitud.estado != "rechazada"
    ).all()

    data = []
    for s in solicitudes:
        data.append({
            "id": s.id,
            "insumo": s.insumo,
            "equipo_estandar": s.equipo_estandar,
            "jefatura": s.jefatura,
            "estado": s.estado,
            "fecha_creacion": s.fecha_creacion.strftime("%Y-%m-%d %H:%M")
        })
    return jsonify(data)


@solicitudes_bp.route('/solicitudes/<int:id>/cerrar', methods=['PUT'])
def cerrar_solicitud(id):
    s = Solicitud.query.get_or_404(id)
    s.estado = "CERRADA"
    db.session.commit()
    return jsonify({"message": "Solicitud cerrada correctamente"})


@solicitudes_bp.route('/solicitudes/cerradas', methods=['GET'])
def obtener_solicitudes_cerradas():
    solicitudes = Solicitud.query.filter(Solicitud.estado.in_(["CERRADA", "RECHAZADA"])).all()
    data = []
    for s in solicitudes:
        usuario = Usuario.query.get(s.usuario_id)
        data.append({
            "id": s.id,
            "insumo": s.insumo,
            "equipo_estandar": s.equipo_estandar,
            "jefatura": s.jefatura,
            "estado": s.estado,
            "fecha_creacion": s.fecha_creacion.strftime("%Y-%m-%d %H:%M"),
            "nombre_usuario": usuario.nombre if usuario else "N/A"
        })
    return jsonify(data)


@solicitudes_bp.route('/usuario/<int:usuario_id>/historial', methods=['GET'])
def historial_solicitudes_usuario(usuario_id):
    solicitudes = Solicitud.query.filter(
        Solicitud.usuario_id == usuario_id,
        Solicitud.estado.in_(["CERRADA", "rechazada"])
    ).all()

    data = []
    for s in solicitudes:
        data.append({
            "id": s.id,
            "insumo": s.insumo,
            "estado": s.estado,
            "fecha_creacion": s.fecha_creacion.strftime("%Y-%m-%d %H:%M")
        })
    return jsonify(data)





@solicitudes_bp.route('/solicitudes/cerradas/exportar', methods=['GET'])
def exportar_solicitudes_cerradas():
    solicitudes = Solicitud.query.filter_by(estado="CERRADA").all()
    data = []

    for s in solicitudes:
        usuario = Usuario.query.get(s.usuario_id)
        data.append({
            "ID": s.id,
            "Usuario": usuario.nombre if usuario else "N/A",
            "Insumo": s.insumo,
            "Equipo Estándar": s.equipo_estandar,
            "Justificación": s.justificacion,
            "Jefatura": s.jefatura,
            "Observación": s.observacion,
            "Fecha creación": s.fecha_creacion.strftime("%Y-%m-%d %H:%M"),
            "Estado": s.estado
        })

    df = pd.DataFrame(data)
    output = BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Solicitudes Cerradas')

    output.seek(0)
    return send_file(
        output,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        as_attachment=True,
        download_name='solicitudes_cerradas.xlsx'
    )


@solicitudes_bp.route('/solicitudes/<int:id>/rechazar', methods=['PUT'])
def rechazar_solicitud(id):
    solicitud = Solicitud.query.get_or_404(id)
    solicitud.estado = "rechazada"  
    db.session.commit()
    return jsonify({"message": "Solicitud rechazada y cerrada"}), 200

