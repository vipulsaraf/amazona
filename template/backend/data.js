import bcrypt from 'bcryptjs';
const data={
    users:[{
name:'Bair',
email:'dmin1@example.com',
password:bcrypt.hashSync('1234',8),
isAdmin:false,
    }],
    products:[
        {
          
            name:' Slim Shirts',
            category:'Shirts',
            images:'/images/p1.jpg',
            price:120,
            brand:'Nike',
            rating:4,
            numReviews:10,
            description:' high quality product',
            countInStock:12
        },
        {
         
            name:'adidas',
            category:'Shirts',
            images:'/images/p2.jpg',
            price:124,
            brand:'brand',
            rating:4.5,
            numReviews:10,
            description:' high quality product',
            countInStock:12
        },
        {
     
            name:'Puma Slim Shirts',
            category:'Shirts',
            images:'/images/p3.jpg',
            price:120,
            brand:'Nike',
            rating:4,
            numReviews:10,
            description:' high quality product',
            countInStock:1
        },
        {
         
            name:'armani Slim Shirts',
            category:'Shirts',
            images:'/images/p4.jpg',
            price:120,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:' high quality product',
            countInStock:10
        },
        {
          
            name:'levis Slim Shirts',
            category:'Shirts',
            images:'/images/p5.jpg',
            price:120,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:' high quality product',
            countInStock:3
        },
        {
         
            name:' Nike Shirts',
            category:'Shirts',
            images:'/images/p6.jpg',
            price:120,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:' high quality product',
            countInStock:3
        },
    ]
};
export  default data;