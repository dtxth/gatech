from db.models import TaxModel, DiscountModel
import unittest
from app import app

TaxModel.get_tax = lambda region: 3
DiscountModel.get_discount = lambda cost: 5

class FlaskTest(unittest.TestCase):
    def test_not_allowed(self):
        response = app.test_client().get('/api/v1/calculate')
        self.assertEqual(response.status_code, 405)

    def test_empty_body(self):
        response = app.test_client().post('/api/v1/calculate')
        self.assertEqual(response.status_code, 400)

    def test_success(self):
        response = app.test_client().post('/api/v1/calculate', json={ "amount":1, "cost": 1000, "region": "NV"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'discount': 5.0, 'discounted_cost': 950.0, 'tax': 3.0, 'total_cost': 978.5})

    def test_failed(self):
        response = app.test_client().post('/api/v1/calculate', json={ "amount":1, "cost": "dfgdfg", "region": "NV"})
        self.assertEqual(response.status_code, 400)

 
if __name__ == '__main__':
    unittest.main()