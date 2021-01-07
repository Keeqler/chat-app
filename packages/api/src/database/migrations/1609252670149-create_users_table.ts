import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsersTable1609252670149 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'username',
            type: 'varchar',
            length: '20'
          },
          {
            name: 'password',
            type: 'char',
            length: '60'
          },
          {
            name: 'avatar',
            type: 'char',
            length: '36',
            isNullable: true
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('orphanages')
  }
}
