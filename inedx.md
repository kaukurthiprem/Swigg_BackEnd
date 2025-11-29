requrments:
 *express
 *mongoos
 *dotenv
 *body-parser
 *nodemon
 *jwt(jsonwebtoken) token -to conver the emails ot tocanes 
 *bcryptjs - to hash the password because it is the sensitive info
 *multer - to add images (it is an inbuilt function)
 
 
 ##connection to database

 ##APIS

    *Models
        -vendor:username,email,password.
        -firm(resturant):firmname,address,category,region,offer,image
        -products:product,price,category,image,bestseller,discription



    *



    *controllers
        -vendorcontroller
    *routers
        -vendorRoughts




firm structur of body in post 

{
    "firmName": "kpk",
    "address": "ongole",
    "category":["vegeration","non-vegeration"],
    "region": ["north","south"],
    "offer": "50% off",
    "image": "hello.jpj"
}