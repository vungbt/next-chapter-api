'use strict'
const { DataTypes } = require('sequelize')
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('file', {
        id: {
          type: DataTypes.UUID,
          defaultValue: () => uuidv4(),
          primaryKey: true,
        },
        url: {
          type: DataTypes.STRING,
        },
        storageId: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        provider: {
          type: DataTypes.ENUM('s3', 'cloudinary', 'system'),
          allowNull: true,
          defaultValue: 'cloudinary'
        },
        metadata: {
          type: DataTypes.JSON,
          allowNull: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: null,
        },
      })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('file')
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
