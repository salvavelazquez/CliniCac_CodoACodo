from app.database import get_db

class User:
    #CONSTRUCTOR
    def __init__(self,id_user=None, username=None, email=None,
    password_user=None, date_user=None, country=None, is_admin=None):
        self.id_user = id_user
        self.username = username
        self.email = email
        self.password_user = password_user
        self.date_user = date_user
        self.country = country
        self.is_admin = is_admin

    # Decorador, metodo estatico porque no necesitamos instanciar la clase
    @staticmethod
    def get_all():
        db = get_db() # conexion con nuestra base de datos
        cursor = db.cursor() 
        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall() #lista de tuplas
        users = []
        for row in rows:
            new_user = User(row[0],row[1],row[2],row[3],row[4],row[5],row[6])
            users.append(new_user) #conversion a lista de objetos
        cursor.close()
        return users
    
    #Obtener un usuario por su id
    @staticmethod
    def get_by_id(user_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE id_user = %s", (user_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return User(id_user=row[0], username=row[1], email=row[2], password_user=row[3], date_user=row[4], country=row[5], is_admin=row[6])
        return None
    
    def save(self):
        #logica para INSERT/UPDATE en base de datos
        db = get_db()
        cursor = db.cursor()
        if self.id_user:
            cursor.execute("""
                UPDATE users SET username = %s, email = %s, password_user = %s, date_user = %s, country = %s, is_admin = %s
                WHERE id_user = %s
            """, (self.username,self.email,self.password_user,self.date_user,self.country,self.is_admin,self.id_user))
        else:
            cursor.execute(""" INSERT INTO users (username,email,password_user,date_user,country,is_admin) VALUES (%s,%s,%s,%s,%s,%s)""",
                            (self.username,self.email,self.password_user,self.date_user,self.country,self.is_admin))
            self.id_user = cursor.lastrowid

        db.commit()
        cursor.close()


    #Eliminar usuario
    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM users WHERE id_user = %s", (self.id_user,))
        db.commit()
        cursor.close()    

    #formato diccionary
    def serialize(self):
        return {
            'id_user': self.id_user,
            'username': self.username,
            'email': self.email,
            'password_user': self.password_user,
            'date_user': self.date_user,
            'country': self.country,
            'is_admin': self.is_admin,
        }