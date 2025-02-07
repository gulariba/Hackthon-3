
export interface Product {
    product: string;
    _id : string;
    productname : string;
    _type : "product";
    image? : {
        asset : {
            _ref : "image";
        }
    };
    price : number;
    description :string;
    slug : {
        _type : "slug"
        current : "string"
    }
}