// Import necessary libraries
import { getbooks } from '../controllers/booksctrl';
import { Request, Response } from 'express';
import { mockRequest, mockResponse } from 'mock-req-res';
import { Model } from 'sequelize';

/**
 * This function handles the GET request for retrieving a book by its ID.
 * It checks if the requested book exists in the database and returns the book data if found.
 * If the book is not found, it returns a 404 status with an appropriate error message.
 *
 * @param req - The Express request object containing the book ID in the request parameters.
 * @param res - The Express response object to send the response back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
describe('GET /books/:id', () => {
  it('should return a 404 status when the requested book ID does not exist', async () => {
    const req = mockRequest({ params: { id: 1 } }) as Request;
    const res = mockResponse() as Response;

    // Mock the Sequelize model findOne method to return null
    jest.spyOn(Model, 'findOne').mockResolvedValueOnce(null);

    await getbooks(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 1001,
      msg: 'Book data not found',
      data: [],
    });
  });
});

describe('GET /books/:id', () => {
  it('should return a 200 status when the requested book ID exists', async () => {
    const req = mockRequest({ params: { id: 1 } }) as Request;
    const res = mockResponse() as Response;

    // Mock the Sequelize model findOne method to return a book object
    const mockBook: any = { id: 1, title: 'Test Book', author: 'Test Author' };
    jest.spyOn(Model, 'findOne').mockResolvedValueOnce(mockBook);

    await getbooks(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 0,
      msg: 'Book data found',
      data: [mockBook],
    });
  });
});