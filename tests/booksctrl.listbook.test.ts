// Import required libraries and modules
import { listbooks } from '../controllers/booksctrl';
import { mockRequest, mockResponse } from 'mock-req-res';
import { Request, Response } from 'express';
import { Op } from 'sequelize';

// Mock Sequelize model findAll method
const findAllMock = jest.fn().mockResolvedValue([
  { id: 1, title: 'Book 1', author: 'Author 1', publishedYear: 2022, genres: 'Genre 1' },
  { id: 2, title: 'Book 2', author: 'Author 2', publishedYear: 2021, genres: 'Genre 2' },
]);

// Mock Sequelize model
const sequelizeMock = {
  models: {
    books: {
      findAll: findAllMock,
    },
  },
};

// Mock req and res objects
const req = {
  query: {search: 'Author 1'},
};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

/**
 * This function handles the retrieval of book data based on search criteria.
 * It uses the provided request and response objects to interact with the database and send a response.
 *
 * @param req - The request object containing search criteria.
 * @param res - The response object to send the retrieved data.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
// Test case: Should return an empty list when no books are available
test('Should return an empty list when no books are available', async () => {
  // Call the listbooks function
  await listbooks(req as unknown as Request, res as unknown as Response);

  // Assert the response status and data
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    code: 1000,
    msg: 'Books data not found',
    data: [],
  });

  // Assert the Sequelize model method calls
  expect(sequelizeMock.models.books.findAll).toHaveBeenCalledTimes(1);
  expect(sequelizeMock.models.books.findAll).toHaveBeenCalledWith({
    attributes: { exclude: ['created_at', 'updated_at'] },
  });
});

/**
 * This function handles the retrieval of book data based on search criteria.
 * It uses the provided request and response objects to interact with the database and send a response.
 *
 * @param req - The request object containing search criteria.
 * @param res - The response object to send the retrieved data.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
test('Should return a list of books when multiple search terms match', async () => {
  // Call the listbooks function
  await listbooks(req as unknown as Request, res as unknown as Response);

  // Assert the response status and data
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    code: 0,
    msg: 'Books data found',
    data: [
      { id: 1, title: 'Book 1', author: 'Author 1', publishedYear: 2022, genres: 'Genre 1' },
      { id: 2, title: 'Book 2', author: 'Author 2', publishedYear: 2021, genres: 'Genre 2' },
    ],
  });

  // Assert the Sequelize model method calls
  expect(sequelizeMock.models.books.findAll).toHaveBeenCalledTimes(1);
  expect(sequelizeMock.models.books.findAll).toHaveBeenCalledWith({
    attributes: { exclude: ['created_at', 'updated_at'] },
    where: {
      [Op.or]: [
        { title: { [Op.like]: '%Author 1%' } },
        { author: { [Op.like]: '%Author 1%' } },
        { publishedYear: { [Op.like]: '%Author 1%' } },
        { genres: { [Op.like]: '%Author 1%' } },
      ],
    },
  });
});