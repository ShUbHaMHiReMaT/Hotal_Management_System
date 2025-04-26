from flask import Flask, request, render_template, redirect
import mysql.connector

app = Flask(__name__)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",          # your DB username
    password="",          # your DB password (empty if default in XAMPP)
    database="hotel_management"  # your database name
)

cursor = db.cursor()

@app.route('/')
def home():
    return render_template('main.html')  # main.html inside templates/

@app.route('/submit', methods=['POST'])
def submit_form():
    form_name = request.form.get('form_name')

    if form_name == "customer_form":
        name = request.form.get('name')
        phone = request.form.get('phone')
        address = request.form.get('address')
        email = request.form.get('email')

        cursor.execute("""
            INSERT INTO Customers (name, phone, address, email)
            VALUES (%s, %s, %s, %s)
        """, (name, phone, address, email))
        db.commit()

    elif form_name == "food_form":
        name = request.form.get('name')
        category = request.form.get('category')
        type_ = request.form.get('type')
        price = request.form.get('price')
        description = request.form.get('description')

        cursor.execute("""
            INSERT INTO FoodMenu (name, category, type, price, description)
            VALUES (%s, %s, %s, %s, %s)
        """, (name, category, type_, price, description))
        db.commit()

    elif form_name == "chef_form":
        name = request.form.get('name')
        speciality = request.form.get('speciality')
        experience = request.form.get('experience')
        salary = request.form.get('salary')
        phone = request.form.get('phone')
        address = request.form.get('address')

        cursor.execute("""
            INSERT INTO Chefs (name, speciality, experience, salary, phone, address)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (name, speciality, experience, salary, phone, address))
        db.commit()

    elif form_name == "waiter_form":
        name = request.form.get('name')
        age = request.form.get('age')
        experience = request.form.get('experience')
        salary = request.form.get('salary')
        phone = request.form.get('phone')
        address = request.form.get('address')

        cursor.execute("""
            INSERT INTO Waiters (name, age, experience, salary, phone, address)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (name, age, experience, salary, phone, address))
        db.commit()

    elif form_name == "manager_form":
        name = request.form.get('name')
        position = request.form.get('position')
        salary = request.form.get('salary')
        phone = request.form.get('phone')
        email = request.form.get('email')
        address = request.form.get('address')

        cursor.execute("""
            INSERT INTO Managers (name, position, salary, phone, email, address)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (name, position, salary, phone, email, address))
        db.commit()

    else:
        return "Invalid form submission", 400

    # After inserting into database, redirect to home page
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
