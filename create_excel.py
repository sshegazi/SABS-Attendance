import pandas as pd

# The list of all 15 students to pre-populate the file
# Fixed the syntax error on id008
students = [
    ['id001', 'Sarah Mohammed Osman'],
    ['id002', 'Najla AL-Dossari'],
    ['id003', 'Reem ahmed'],
    ['id004', 'Alanoud Al-Sudairi'],
    ['id005', 'Hessa Al-Otaibi'],
    ['id006', 'Layan Al-Qahtani'],
    ['id007', 'Muneera Al-Subaie'],
    ['id008', 'Noura Al-Ghamdi'],
    ['id009', 'Sara Al-Zahrani'],
    ['id010', 'Jawaher Al-Mutairi'],
    ['id011', 'Fatimah Al-Shammari'],
    ['id012', 'Maha Al-Enazi'],
    ['id013', 'Lulwa Al-Rashidi'],
    ['id014', 'Asma Al-Harbi'],
    ['id015', 'Ghalia Al-Khalidi'],
]

# Create a DataFrame with columns
df = pd.DataFrame(students, columns=['Student ID', 'Name'])
df['Date'] = "Not Present"
df['Time'] = "Not Present"

# Save it to your desktop
df.to_excel('Attendance_Final.xlsx', index=False)

print("--------------------------------------------------")
print("✅ Success! 'Attendance_Final.xlsx' has been created.")
print("You can now open the file to see your student list.")
print("--------------------------------------------------")