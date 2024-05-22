patients = [
    { "id": 'P001', "name": 'John Doe', "last_visit": '2024-05-10', "upcoming_appointments": '2024-06-01', "age": 30, "weight": 70, "height": 175, "contact": '123-456-7890', "email": 'john@example.com', "address": '123 Main St', "gender": 'Male', "blood_group": 'O+' },
    { "id": 'P002', "name": 'Jane Smith', "last_visit": '2024-04-22', "upcoming_appointments": '---', "age": 25, "weight": 60, "height": 165, "contact": '987-654-3210', "email": 'jane@example.com', "address": '456 Oak Ave', "gender": 'Female', "blood_group": 'A+' },
]

def format_patient_data(patient):
    # Format patient data according to the desired format
    formatted_patient = {
        "id": patient["id"],
        "name": patient["name"],
        "lastVisit": patient["last_visit"],
        "upcomingAppointments": patient["upcoming_appointments"],
        "age": patient["age"],
        "weight": patient["weight"],
        "height": patient["height"],
        "contact": patient["contact"],
        "email": patient["email"],
        "address": patient["address"],
        "gender": patient["gender"],
        "bloodGroup": patient["blood_group"],
    }
    return formatted_patient
