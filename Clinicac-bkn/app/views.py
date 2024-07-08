from flask import jsonify, request
from app.models import User


def index():
    response = {"message":"Hola mundo desde API Flask! "}
    return jsonify(response)


#funcion que busca un solo user
def get_user(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.serialize())

#funcion que busca todo el listado de los usuarios
def get_all_users():
    users = User.get_all()
    list_users = [user.serialize() for user in users]
    return jsonify(list_users)

def create_user():
    data = request.json
    # agregar una logica de validacion de datos
    new_user = User(None, data["username"],data["email"],data["password_user"],data["date_user"],data["country"],data["is_admin"])
    new_user.save()
    return jsonify({"message":"Usuario creado con Exito!!"}),201

def update_user(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    data = request.json
    user.username = data['username']
    user.email = data['email']
    user.password_user = data['password_user']
    user.date_user = data['date_user']
    user.country = data['country']
    user.is_admin = data['is_admin']
    user.save()
    return jsonify({'message': 'User updated successfully'})

def delete_user(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user.delete()
    return jsonify({'message': 'User deleted successfully'})
