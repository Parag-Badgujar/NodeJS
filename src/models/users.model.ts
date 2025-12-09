import { Model, Table, Column, DataType, Sequelize, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';

// export const User = sequelize.define('Users', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     mobileNumber: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     otp: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     isVerified: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
// }, {
//     tableName: 'users',
//     timestamps: true,
// });

@Table({
    tableName: 'users',
    // timestamps: true,
})

export default class User extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field : 'id'
    })
    id?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field : 'firstName'
    })
    firstName?: string;
 
    @Column({
        type : DataType.STRING,
        allowNull: false,
        field : 'lastName'
    })
    lastName?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        field : 'email'
    })
    email? : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        field : 'mobileNumber'
    })
    mobileNumber? : string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true,
        field : 'otp'
    })
    otp? : string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull : true,
        field : 'isVerified'
    })
    isVerified? : boolean;

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