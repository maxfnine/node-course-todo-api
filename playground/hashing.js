const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'myPassword';
bcrypt.genSalt(10,(err,salt)=>{
bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
    
})
});

var hashedPassword='$2a$10$OjKVTVVM357uNfxKO2lZwugddt5UrnjuY79mIM7rneJrQTmnIAKhG';
bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res);
    
    
});

// var data={
//     id:10
// };

// var token = jwt.sign(data,'abc123');
// console.log(token);
// var decoded = jwt.verify(token,'abc123');
// console.log('decoded',decoded);

// var message= 'Sample string';

// var hash= SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id:4
// };

// var token =
// {
//     data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// }

// // token.data.id=5;
// // token.hash=SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resultHash === token.hash)
// {
//     console.log('Data was not changed');
// }
// else{
//     console.log('Data was change do not trust');
    
// }
