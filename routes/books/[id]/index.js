const { checktoken } = require('../../../controllers/authctrl')
const { getbooks, delbooks, patchbooks } = require('../../../controllers/booksctrl')

exports.GET = [ checktoken, getbooks ];
exports.DELETE = [ checktoken, delbooks ];
exports.PUT = [ checktoken, patchbooks ];
