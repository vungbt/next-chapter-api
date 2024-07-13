'use strict';
const { DataTypes } = require('sequelize')
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('report', {
        id: {
          type: DataTypes.UUID,
          defaultValue: () => uuidv4(),
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'user',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('normal', 'saying'),
          allowNull: true,
          defaultValue: 'normal'
        },
        contentId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'content',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
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

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('report')
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};