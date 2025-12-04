requrments:
 *express
 *mongoos
 *dotenv
 *body-parser
 *nodemon
 *jwt(jsonwebtoken) token -to conver the emails ot tocanes 
 *bcryptjs - to hash the password because it is the sensitive info
 *multer - to add images (it is an inbuilt function)
 *cors
 
 
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




API ROTERS URL

        VENDORS:

            VENDOR REGISTER:localhost:4000/vendor/register

            VENDOR LOGIN:localhost:4000/vendor/login

            GET ALL VENDOR DETILES WITH RELATED RECORDS:localhost:4000/vendor/all-vendors



        FIRMS(RESTORENTS):localhost:4000/firm/add-firm


            ADDING FIRM(RESTORUNT) HERE IN HEADERS  "KEY" AND "VALUE" IS MORE IMPORTANT
              KEY:token
              value:when you login a token is generarte 

        PRODUCTS ADDING by firmID :localhost:4000/product/add-product/:firmId
            
