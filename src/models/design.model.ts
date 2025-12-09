import { Model, Table, Column, DataType, Sequelize, ForeignKey, BelongsTo } from 'sequelize-typescript';


// export const Design = sequelize.define('Design', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     }
// }, {
//     tableName: 'design', // Match the table name in your schema
//     timestamps: true // Assuming you don't need created/updated fields for this table       
// });

@Table({
    tableName: 'design',
    // timestamps: true
})
export default class Design extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    })
    id?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        field: 'name'
    })
    name?: string;

      @Column({
    type: 'TIMESTAMP',
    field: 'createdAt',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  })
  createdAt?: 'TIMESTAMP';

  @Column({
    type: 'TIMESTAMP',
    field: 'updatedAt',
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  })
  updatedAt?: 'TIMESTAMP';
}
