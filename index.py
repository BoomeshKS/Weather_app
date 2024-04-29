from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)
#Api

#Now connect to mongodb compass
client = MongoClient('mongodb://localhost:27017/')
db = client['Weather_Data']
collection = db['User_Weather_Data']

@app.route('/api/weather', methods=['POST'])
def members():
    data = request.json
    location = data.get('location')
    temperature = data.get('temperature')
    humidity = data.get('humidity')
    login_username = data.get('loginUsername')
    print("Location:", location)
    print('Temperature:',temperature)
    print('Humidity:',humidity)

    #Insert the data..
    timestamp = datetime.now()
    weather_record = {
        'Location': location,
        'Temperature': temperature,
        'Humidity': humidity,
        'Timestamp': timestamp,
        'loginUsername': login_username
    }
    result = collection.insert_one(weather_record)

    return jsonify({'message': 'POST request received'})


#send the data back to Home.jsx

@app.route('/api/weather', methods=['GET'])
def get_weather_data():
    data = list(collection.find({}, {'_id': 0}) .sort('Timestamp', -1))  # Exclude the _id field
    return jsonify(data)

#For Delete Data

@app.route('/api/weather/delete/<location>', methods=['DELETE','OPTION'])
def delete_weather_data(location):
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request received'})
        response.headers.add('Access-Control-Allow-Methods', 'DELETE')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    # Actual DELETE request
    collection.delete_one({'Location': location})
    return jsonify({'message': f'Deleted record for {location}'})

if __name__ == '__main__':
    app.run(debug=True)
    print("hii")