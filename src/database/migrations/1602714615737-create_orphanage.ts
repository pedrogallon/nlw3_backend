import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanage1602714615737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orphanages",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',

          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10, // após virgula; isso é diferente em noSQL; scale = antes do ponto, precision = depois do ponto
            precision: 12 //total
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10,
            precision: 12
          },
          {
            name: 'about',
            type: 'text'
          },
          {
            name: 'instructions',
            type: 'text'
          },
          {
            name: 'opening_hours',
            type: 'varchar'
          },
          {
            name: 'open_on_weekends',
            type: 'boolean',
            default: false
          }

        ],
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }
}
