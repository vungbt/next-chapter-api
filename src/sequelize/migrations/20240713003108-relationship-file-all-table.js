'use strict'
const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const tablesToUpdate = [
        { table: 'user', oldColumn: 'avatarUrl', newColumn: 'avatarId' },
        { table: 'author', oldColumn: 'avatarUrl', newColumn: 'avatarId' },
        { table: 'category', oldColumn: 'thumbnail', newColumn: 'thumbnailId' },
        { table: 'content', oldColumn: 'thumbnail', newColumn: 'thumbnailId' },
      ]

      await queryInterface.renameColumn('content', 'createdById', 'userId', {
        transaction,
      });
      await queryInterface.renameColumn('category', 'createdById', 'userId', {
        transaction,
      });
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
        { table: 'user', newColumn: 'avatarId', oldColumn: 'avatarUrl' },
        { table: 'author', newColumn: 'avatarId', oldColumn: 'avatarUrl' },
        { table: 'category', newColumn: 'thumbnailId', oldColumn: 'thumbnail' },
        { table: 'content', newColumn: 'thumbnailId', oldColumn: 'thumbnail' },
      ]

      await queryInterface.renameColumn('content', 'userId', 'createdById', {
        transaction,
      });
      await queryInterface.renameColumn('category', 'userId', 'createdById', {
        transaction,
      });
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
