const httpMocks = require("node-mocks-http");

const { getProductByID, getAllProduct } = require("./product");

const mockFindOneProduct = jest.fn();
const mockFindAllProduct = jest.fn();



//test getproductByID
test("getProductById returns an existing product from merchant", async() => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/merchant/1/product/2",
        params: {
            id: 1,
            prodid: 2
        },
    });
    // console.log('ini request setelah httpmocks.createrequest',request)
    const response = httpMocks.createResponse();
    mockFindOneProduct.mockResolvedValue({
        "products": {
            "id": 1,
            "name": "test1"
        }
    });
    //  console.log('ini response setelah httpmocks.createrequest',response)
    await getProductByID(request, response);

    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "products": {
            "id": 1,
            "name": "test1"
        }
    });
})
test("getProductById returns 404 when a product id does not exists", async() => {
    const request = httpMocks.createRequest({
        method: "GET",
        url: "/showProduct/:id",
        params: {
            id: 2,
        },
    });
    const response = httpMocks.createResponse();

    mockFindOneProduct.mockResolvedValue(null);

    await getProductByID(request, response);

    expect(response.statusCode).toEqual(404);
    expect(response._getJSONData()).toEqual({
        item: "Product doesn't exist"
    });
});