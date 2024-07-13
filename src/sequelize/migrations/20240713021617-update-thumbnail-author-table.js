'use strict'
const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const tablesToUpdate = [
        { table: 'author', oldColumn: 'thumbnail', newColumn: 'thumbnailId' },
      ]
      for (const { table, oldColumn, newColumn } of tablesToUpdate) {
        await queryInterface.removeColumn(table, oldColumn, { transaction })
        await queryInterface.addColumn(
          table,
          newColumn,
          {
            type: DataTypes.UUID,
            references: {
              model: 'file', // name of the table being referenced
              key: 'id', // primary key in the file table
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          { transaction },
        )
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const tablesToRevert = [
        { table: 'author', newColumn: 'thumbnailId', oldColumn: 'thumbnail' },
      ]
      for (const { table, newColumn, oldColumn } of tablesToRevert) {
        await queryInterface.removeColumn(table, newColumn, { transaction })
        await queryInterface.addColumn(
          table,
          oldColumn,
          {
            type: DataTypes.STRING,
            allowNull: true,
          },
          { transaction },
        )
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
