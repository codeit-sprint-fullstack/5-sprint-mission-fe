import {getProduct } from "./ProductService.js"


getProduct(42).then(data => console.log(data));