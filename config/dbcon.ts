import { Sequelize } from 'sequelize';

const dbConnection = (addOptions: object = {}): Sequelize => {
  const dialect: string = process.env.DB_DIALECT as string;
  const name: string = process.env.DB_NAME as string;
  const user: string = process.env.DB_USER as string;
  const password: string = process.env.DB_PASS as string;
  const host: string = process.env.DB_HOST as string;

  let options: any = { host, dialect, ...addOptions };
  return new Sequelize(name, user, password, options);
}

export const dbCon = dbConnection({ timezone: "+07:00" });

