import { Model, Table, Column, DataType, Sequelize, ForeignKey, BelongsTo } from 'sequelize-typescript';

// export const Brand = sequelize.define('Brand', {
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
//     },
//     logo_url: {
//         type: DataTypes.STRING,
//         allowNull: true
//     }
// }, {
//     tableName: 'brands', // Match the table name in your schema
//     timestamps: true // Assuming you don't need created/updated fields for this table
// });

@Table({
    tableName: 'brands',
    // timestamps: true
})

export default class Brand extends Model {
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
        type: DataType.STRING,
        allowNull: true,
        field: 'logo_url'
    })
    logo_url?: string | null;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: 'createdBy'
    })
    createdBy?: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: 'updatedBy'
    })
    updatedBy?: string;

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