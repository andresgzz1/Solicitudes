from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 
from flask_cors import CORS
from .config import Config
from flask_mail import Mail

db = SQLAlchemy()
migrate = Migrate()  
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    mail.init_app(app)
    db.init_app(app)
    CORS(app)
    migrate.init_app(app, db)  

    from .routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp)
    from .routes.solicitudes_routes import solicitudes_bp
    app.register_blueprint(solicitudes_bp)

    return app
