import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614264232552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "survey_id",
                        type: "uuid"
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUsers",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE", //serve para deletar automaticamente caso o registro que ela esteja fazendo referencia ela seja deletada
                        onUpdate: "CASCADE" //serve para atualizar automaticamente caso o registro que ela estaja fazendo referencia seja atualizado
                    },
                    {
                        name: "FKSurvey",
                        referencedTableName: "surveys",
                        referencedColumnNames: ["id"],
                        columnNames: ["survey_id"],
                        onDelete: "CASCADE", //serve para deletar automaticamente caso o registro que ela esteja fazendo referencia ela seja deletada
                        onUpdate: "CASCADE" //serve para atualizar automaticamente caso o registro que ela estaja fazendo referencia seja atualizado
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys_users");
    }

}
