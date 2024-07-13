'use strict'
const { DataTypes } = require('sequelize')
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('chapter_content', {
        id: {
          type: DataTypes.UUID,
          defaultValue: () => uuidv4(),
          primaryKey: true,
        },
        chapterId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'chapter',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        fileId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'file',
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

      // Adding a composite unique constraint on chapterId and fileId
      await queryInterface.addConstraint('chapter_content', {
        fields: ['chapterId', 'fileId'],
        type: 'unique',
        name: 'unique_chapter_file',
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
      // Remove the unique constraint first
      await queryInterface.removeConstraint(
        'chapter_content',
        'unique_chapter_file',
      )

      await queryInterface.dropTable('chapter_content')
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
