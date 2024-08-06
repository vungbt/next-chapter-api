'use strict'
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert(
        'author',
        [
          {
            id: faker.string.uuid(),
            fullName: 'author 1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: faker.string.uuid(),
            fullName: 'author 2',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction },
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('user', {}, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
