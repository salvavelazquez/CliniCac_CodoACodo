from flask import Flask
from app.database import init_app
from app.views import *
# from flask_cors import CORS


#inicializacion de la apliacion con Flask
app = Flask(__name__)
init_app(app)
#permitir solicitudes desde cualquier origin
# CORS(app)

app.route("/",methods=["GET"])(index)
app.route("/api/users/",methods=["GET"])(get_all_users)
app.route("/api/users/",methods=["POST"])(create_user)
app.route('/api/users/<int:user_id>', methods=['GET'])(get_user)
app.route('/api/users/<int:user_id>', methods=['PUT'])(update_user)
app.route('/api/users/<int:user_id>', methods=['DELETE'])(delete_user)

if __name__=="__main__":
    #levanta el servidor de desarrollo flask
    app.run(debug=True)