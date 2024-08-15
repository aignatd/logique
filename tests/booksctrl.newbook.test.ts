import { newbooks } from '../controllers/booksctrl';
import { mockRequest, mockResponse } from 'mock-req-res';

/**
 * This function handles the creation of new books in the system.
 * It expects a request object containing the book details in the request body.
 * The function validates the input data, saves the book to the database, and returns a response with appropriate status codes and messages.
 *
 * @param req - The request object containing the book details.
 * @param res - The response object to be sent back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if the book details are invalid or if the book cannot be saved.
 */
describe('newbooks function', () => {
  it('should return a 200 status code when a new book is successfully saved', async () => {
    // Arrange
    const req = mockRequest({ body: { title: 'Test Book', author: 'Test Author', publishedYear: 2022, genres: 'Test Genre' } });
    const res = mockResponse();

    // Act
    await newbooks(req, res);

    // Assert
    expect(res.status).toBe(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 0,
      msg: 'New book saved',
    });
  });
});

/**
 * This function handles the creation of new books in the system.
 * It expects a request object containing the book details in the request body.
 * The function validates the input data, saves the book to the database, and returns a response with appropriate status codes and messages.
 *
 * @param req - The request object containing the book details.
 * @param res - The response object to be sent back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if the book details are invalid or if the book cannot be saved.
 */
describe('newbooks function', () => {
  it('should return a 400 status code when a new book fails to save', async () => {
    // Arrange
    const req = mockRequest({ body: {} }); // Empty request body to simulate a failed save
    const res = mockResponse();

    // Act
    await newbooks(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      code: 1004,
      msg: 'Book not saved',
    });
  });
});

/**
 * This function handles the creation of new books in the system.
 * It expects a request object containing the book details in the request body.
 * The function validates the input data, saves the book to the database, and returns a response with appropriate status codes and messages.
 *
 * @param req - The request object containing the book details.
 * @param {import('express').Request} req.body.title - The title of the book.
 * @param {import('express').Request} req.body.author - The author of the book.
 * @param {import('express').Request} req.body.publishedYear - The year the book was published.
 * @param {import('express').Request} req.body.genres - The genres of the book.
 * @param res - The response object to be sent back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if the book details are invalid or if the book cannot be saved.
 */
describe('newbooks function', () => {
  it('should validate the input data format and reject invalid entries', async () => {
    // Arrange
    const invalidReq = mockRequest({ body: { title: '', author: 'Test Author', publishedYear: '2022', genres: 'Test Genre' } });
    const validReq = mockRequest({ body: { title: 'Test Book', author: 'Test Author', publishedYear: 2022, genres: 'Test Genre' } });
    const res = mockResponse();

    // Act
    await newbooks(invalidReq, res);
    await newbooks(validReq, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 1004,
      msg: 'Book not saved',
    });
    expect(res.json).toHaveBeenCalledWith({
      code: 0,
      msg: 'New book saved',
    });
  });
});

/**
 * This function handles the creation of new books in the system.
 * It expects a request object containing the book details in the request body.
 * The function validates the input data, saves the book to the database, and returns a response with appropriate status codes and messages.
 *
 * @param req - The request object containing the book details.
 * @param {import('express').Request} req.body.title - The title of the book.
 * @param {import('express').Request} req.body.author - The author of the book.
 * @param {import('express').Request} req.body.publishedYear - The year the book was published.
 * @param {import('express').Request} req.body.genres - The genres of the book.
 * @param res - The response object to be sent back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws Will throw an error if the book details are invalid or if the book cannot be saved.
 */
describe('newbooks function', () => {
  it('should return a meaningful error message when the book title is missing', async () => {
    // Arrange
    const req = mockRequest({ body: { author: 'Test Author', publishedYear: 2022, genres: 'Test Genre' } });
    const res = mockResponse();

    // Act
    await newbooks(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      code: 1004,
      msg: 'Book not saved',
    });
  });
});