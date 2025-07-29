from pydantic import BaseModel, Field, ConfigDict, field_serializer
from typing import Optional, Annotated, Union
from decimal import Decimal
import uuid

# Auth schemas
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Product schemas
class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    type: str = Field(..., min_length=1, max_length=100)
    sku: str = Field(..., min_length=1, max_length=100)
    image_url: Optional[str] = Field(None, max_length=500)
    description: Optional[str] = Field(None, max_length=1000)
    quantity: int = Field(default=0, ge=0)
    price: Annotated[Decimal, Field(gt=0, max_digits=10, decimal_places=2)] 

class ProductUpdate(BaseModel):
    quantity: int = Field(..., ge=0)

class ProductResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        json_encoders={Decimal: lambda v: str(v)}
    )
    
    id: Union[str,uuid.UUID]
    name: str
    type: str
    sku: str
    image_url: Optional[str]
    description: Optional[str]
    quantity: int
    price: Decimal
    
    @field_serializer('id')
    def serialize_id(self, value, _info):
        if isinstance(value, uuid.UUID):
            return str(value)
        return value

class ProductCreateResponse(BaseModel):
    product_id: Union[str,uuid.UUID]
    message: str = "Product created successfully"
    
    
    @field_serializer('product_id')
    def serialize_product_id(self, value, _info):
        if isinstance(value, uuid.UUID):
            return str(value)
        return value
