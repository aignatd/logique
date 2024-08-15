"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const booksctrl_1 = require("../controllers/booksctrl");
const sequelize_1 = require("sequelize");
const mock_req_res_1 = require("mock-req-res");
jest.mock('../models/booksmdl', () => ({
    destroy: jest.fn().mockResolvedValue(1),
}));
describe('Delete Book', () => {
    const req = (0, mock_req_res_1.mockRequest)({ params: { id: 1 } });
    const res = (0, mock_req_res_1.mockResponse)();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should delete a book with valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, booksctrl_1.delbooks)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 0,
            msg: 'Book data deleted',
        });
    }));
    it('should return 404 if book is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.mocked(sequelize_1.Sequelize.prototype.models.books.destroy).mockResolvedValue(0);
        yield (0, booksctrl_1.delbooks)(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            code: 1002,
            msg: 'Book data not found',
        });
    }));
    it('should return 500 if an error occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.mocked(sequelize_1.Sequelize.prototype.models.books.destroy).mockRejectedValue(new Error('Database error'));
        yield (0, booksctrl_1.delbooks)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            code: 3000,
            msg: 'Database error',
        });
    }));
});
