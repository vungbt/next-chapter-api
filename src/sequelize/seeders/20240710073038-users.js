const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert(
        'user',
        [
          {
            id: faker.string.uuid(),
            username: 'admin',
            password: bcrypt.hashSync('Admin123', 10),
            avatarUrl: faker.image.avatar(),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: faker.string.uuid(),
            username: 'customer',
            password: bcrypt.hashSync('Admin123', 10),
            avatarUrl: faker.image.avatar(),
            role: 'customer',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction },
      )
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('user', {}, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
}
