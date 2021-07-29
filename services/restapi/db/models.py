from peewee import Model, CharField, FloatField, fn
from db import init_db

db = init_db()

class NotFoundError(Exception):
    def __init__(self, message):
        self.message = message
    
    def to_json(self):
        return {"error": self.message}

class BaseModel(Model):
    class Meta:
        database = db


class TaxModel(BaseModel):
    region = CharField(2, unique=True)
    tax = FloatField()

    @staticmethod
    def get_tax(region: str):
        try:
            query = TaxModel.get(TaxModel.region == region.upper())
        except TaxModel.DoesNotExist:
            raise NotFoundError(f"{region} region not found")
        else:
            return query.tax

    class Meta:
    	table_name = 'tax'


class DiscountModel(BaseModel):
    cost = FloatField(unique=True)
    discount = FloatField()

    @staticmethod
    def get_discount(cost: float):
        DiscountAlias = DiscountModel.alias()
        subq = DiscountAlias.select(fn.Max(DiscountAlias.cost)).where( DiscountAlias.cost <= cost )    
        try:
            query = DiscountModel.get(DiscountModel.cost == subq)
        except DiscountModel.DoesNotExist:
            return 0
        else:
            return query.discount

    class Meta:
    	table_name = 'discount'
