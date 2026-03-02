const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const CompanyDetails = sequelize.define('CompanyDetails', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    companyname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressline2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gstin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailid: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'companydetails',
    timestamps: false
});

module.exports = CompanyDetails;
