from pydantic.dataclasses import dataclass

@dataclass
class CalculateForm:
    amount: int
    cost: float
    region: str


@dataclass
class CalculateResponse:
    discount: float
    tax: float
    discounted_cost: float
    total_cost: float
