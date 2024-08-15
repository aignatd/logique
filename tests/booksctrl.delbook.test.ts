import { delbooks } from '../controllers/booksctrl';
import { Sequelize } from 'sequelize';
import { mockRequest, mockResponse } from 'mock-req-res';

jest.mock('../models/booksmdl', () => ({
  destroy: jest.fn().mockResolvedValue(1),
}));

describe('Delete Book', () => {
  const req = mockRequest({ params: { id: 1 } });
  const res = mockResponse();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a book with valid id', async () => {
    await delbooks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 0,
      msg: 'Book data deleted',
    });
  });

  it('should return 404 if book is not found', async () => {
    (jest.mocked(Sequelize.prototype.models.books.destroy) as jest.Mock).mockResolvedValue(0);

    await delbooks(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 1002,
      msg: 'Book data not found',
    });
  });

  it('should return 500 if an error occurs', async () => {
    (jest.mocked(Sequelize.prototype.models.books.destroy) as jest.Mock).mockRejectedValue(new Error('Database error'));

    await delbooks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 3000,
      msg: 'Database error',
    });
  });
});