const { checktoken } = require('../../controllers/authctrl');
const { listbooks, newbooks } = require('../../controllers/booksctrl');

exports.GET = [ checktoken, listbooks ];
exports.POST = [ checktoken, newbooks ];
