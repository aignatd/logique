import { patchbooks } from '../controllers/booksctrl';
import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { mockRequest, mockResponse } from 'mock-req-res';

/**
 * Handles the PATCH request for updating a book.
 *
 * @param {Request} req - The Express request object containing the book ID and updated data in the request body.
 * @param {Response} res - The Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @remarks
 * This function updates a book in the database using the provided ID and data.
 * It uses the Sequelize model to perform the update operation.
 * If the update is successful, it sends a 200 status code with a success message.
 * If the book ID is not found, it sends a 404 status code with a not found message.
 */
describe('Books Controller - Patch Books', () => {
  let req: Request;
  let res: Response;
  let sequelize: Sequelize;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    sequelize = new Sequelize('sqlite::memory:');
  });

  it('should update a book with valid data', async () => {
    // Arrange
    req.params.id = '1';
    req.body = { title: 'Updated Book Title' };
    // Mock Sequelize model update method
    jest.spyOn(sequelize.models.books, 'update').mockResolvedValue([1]);

    // Act
    await patchbooks(req, res);

    // Assert
    expect(sequelize.models.books.update).toBeCalledWith(
      { title: 'Updated Book Title' },
      { where: { id: 1 } }
    );
    expect(res.status).toBe(200);
    expect(res.json).toHaveBeenCalledWith({
      code: 0,
      msg: 'Book data updated',
    });
  });
});

/**
 * This function handles the PATCH request for updating a book.
 * It uses the provided ID and data to update the book in the database.
 *
 * @param {Request} req - The Express request object containing the book ID and updated data in the request body.
 * @param {Response} res - The Express response object to send the response.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @remarks
 * This function updates a book in the database using the provided ID and data.
 * It uses the Sequelize model to perform the update operation.
 * If the update is successful, it sends a 200 status code with a success message.
 * If the book ID is not found, it sends a 404 status code with a not found message.
 */
describe('Books Controller - Patch Books', () => {
  let req: Request;
  let res: Response;
  let sequelize: Sequelize;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    sequelize = new Sequelize('sqlite::memory:');
  });

  it('should return 404 when trying to update a non-existent book', async () => {
    // Arrange
    req.params.id = '999999';
    req.body = { title: 'Non-existent Book Title' };
    // Mock Sequelize model update method to return 0 rows affected
    jest.spyOn(sequelize.models.books, 'update').mockResolvedValue([0]);
  
    // Act
    await patchbooks(req, res);
  
    // Assert
    expect(sequelize.models.books.update).toHaveBeenCalledWith(
      { title: 'Non-existent Book Title' },
      { where: { id: 999999 } }
    );
    expect(res.status).toBe(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 1003,
      msg: 'Book data not updated',
    });
  });
});

