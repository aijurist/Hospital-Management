from patient import patients, format_patient_data
from departments import departments, format_department_data
from staff import staff, format_staff_data
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/patients/getDetails', methods=['GET'])
def get_patients():
    # Format patient data and return as JSON
    formatted_patients = [format_patient_data(patient) for patient in patients]
    return jsonify(formatted_patients)

@app.route('/patients/newPatientDetails', methods=['POST'])
def add_patient():
    new_patient_data = request.json
    # DB CONNECTION ALGO
    patients.append(new_patient_data)
    return jsonify(new_patient_data), 201


@app.route('/departments/getDetails', methods=['GET'])
def get_departments():
    # Format department data and return as JSON
    formatted_departments = [format_department_data(department) for department in departments]
    return jsonify(formatted_departments)


@app.route('/staff/getDetails', methods=['GET'])
def get_staff():
    formatted_staff = [format_staff_data(s) for s in staff]
    return jsonify(formatted_staff)


@app.route('/staff/getDoctors', methods=['GET'])
def get_doctors():
    doctors = [s for s in staff if s['position'] == 'Doctor']
    formatted_doctors = [format_staff_data(doctor) for doctor in doctors]
    return jsonify(formatted_doctors)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")