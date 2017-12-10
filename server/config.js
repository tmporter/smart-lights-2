module.exports = {
   arduino: {
      address: '192.168.168.103',
      username: 'root',
      password: 'arduino'
   },
   mongo: {
      dbUri: 'mongodb://colors_user:colors_user@104.131.46.15:27017/colors?authSource=admin',
      user: 'colors_user',
      pass: 'colors_user'
   },
   ngrok: {
      proto: 'http',
      addr: 3000,
      subdomain: 'smartlights',
      authtoken: 'nXVDHu7QFBRy2mW6LoXz_2wDUU1vEbjdfR7ujDUeCg',
      host_header: 'localhost:3000'
   }
};