from api.calculate import calculate
from flask import Flask

app = Flask(__name__)

API_PREFIX = '/api/v1/{app_route}'

app.add_url_rule(API_PREFIX.format(app_route='calculate'),'calculate', calculate, methods=['POST'])    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
