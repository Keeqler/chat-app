import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createMessagesTable1609252680078 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'message',
            type: 'varchar',
            length: '1000'
          },
          {
            name: 'senderId',
            type: 'integer',
            unsigned: true
          },
          {
            name: 'receiverId',
            type: 'integer',
            unsigned: true
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: "strftime('%Y-%m-%dT%H:%M:%SZ')"
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: "strftime('%Y-%m-%dT%H:%M:%SZ')"
          }
        ],
        foreignKeys: [
          {
            columnNames: ['senderId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          {
            columnNames: ['receiverId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        ]
      })
    )
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('orphanages')
  }
}
