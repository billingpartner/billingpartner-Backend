const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userModel');

const Quotation = sequelize.define('Quotation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    companyNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    addressLine2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gstin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customerNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customerGstin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customerAddressLine1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customerAddressLine2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    billDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    billItems: {
        type: DataTypes.JSON,
        allowNull: true
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    tax: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    taxAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    grandTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    termsAndConditions: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'quotations',
    timestamps: true
});

// Define association
User.hasMany(Quotation, { foreignKey: 'userId' });
Quotation.belongsTo(User, { foreignKey: 'userId' });

module.exports = Quotation;
