const persistence = "MONGO";
let productsService;
let cartsService;
let usersService;

switch(persistence) {
    case "MONGO":
        const {default:MongoProd} = await import('./MongoDAO/Products.js');
        productsService = new MongoProd();
        const {default:MongoCarts} = await import('./MongoDAO/Carts.js');
        cartsService =  new MongoCarts();
        const {default:MongoUsers} = await import('./MongoDAO/Users.js');
        usersService = new MongoUsers();
        break;
    case "FILESYSTEM":
        const {default:FileProd} = await import('./FilesDAO/Products.js');
        productsService = new FileProd();
        const {default:FileCarts} = await import('./FilesDAO/Carts.js');
        cartsService =  new FileCarts();
        usersService = {};
        break;
}
const services = {
    productsService,
    cartsService,
    usersService
}

export default services;