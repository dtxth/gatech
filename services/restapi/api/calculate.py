from api.types import CalculateForm, CalculateResponse
from flask import Flask, request
from dataclasses import asdict
from pydantic.error_wrappers import ValidationError
from db.models import DiscountModel, TaxModel, NotFoundError


def calculate() -> CalculateResponse:
    try:
        data = CalculateForm(**request.json)
    except (ValidationError, TypeError) as err:
        return {"error": str(err)}, 400

    discount = DiscountModel.get_discount(data.cost)

    try:
        tax = TaxModel.get_tax(data.region)
    except NotFoundError as err:
        return err.to_json(), 400

    discounted_cost = data.amount * ( data.cost - data.cost * discount/100)
    total_cost =  discounted_cost + discounted_cost * tax/100
    res = CalculateResponse(discount, tax, discounted_cost, total_cost)

    return asdict(res), 200