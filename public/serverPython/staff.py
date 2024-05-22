staff = [
    { "id": 'S001', "name": 'Alice Johnson', "position": 'Doctor', "department": 'Cardiology', "contact": '123-456-7890', "email": 'alice@example.com', "address": '123 Medical St', "gender": 'Female', "experience": '10 years', "shift": 'Day' },
    { "id": 'S002', "name": 'Bob Smith', "position": 'Nurse', "department": 'Neurology', "contact": '987-654-3210', "email": 'bob@example.com', "address": '456 Health Ave', "gender": 'Male', "experience": '5 years', "shift": 'Night', "assignedDoctor": 'Dr. Neurologist' },
]

def format_staff_data(staff):
    formatted_staff = {
        "id": staff["id"],
        "name": staff["name"],
        "position": staff["position"],
        "department": staff["department"],
        "contact": staff["contact"],
        "email": staff["email"],
        "address": staff["address"],
        "gender": staff["gender"],
        "experience": staff["experience"],
        "shift": staff["shift"]
    }
    if "assignedDoctor" in staff:
        formatted_staff["assignedDoctor"] = staff["assignedDoctor"]
    return formatted_staff
