const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userModel');

const PurchaseOrder = sequelize.define('PurchaseOrder', {
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
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    addressLine1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    addressLine2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mailId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gstin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vendorCompanyName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vendorAddressLine1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vendorAddressLine2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vendorMailId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vendorPhoneNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vendorGstin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    items: {
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
    grandTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Partial', 'Cancelled'),
        allowNull: true,
        defaultValue: 'Pending'
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentReferenceNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    termsAndConditions: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    poDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'purchase_orders',
    timestamps: true
});

// Define association
User.hasMany(PurchaseOrder, { foreignKey: 'userId' });
PurchaseOrder.belongsTo(User, { foreignKey: 'userId' });

module.exports = PurchaseOrder;
