"use strict";
const { gettoken } = require('../../../controllers/authctrl');
exports.POST = [gettoken];
