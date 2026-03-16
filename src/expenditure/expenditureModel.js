const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userModel');

const Expenditure = sequelize.define('Expenditure', {
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
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    referenceNumber: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'expenditures',
    timestamps: true
});

// Define association
User.hasMany(Expenditure, { foreignKey: 'userId' });
Expenditure.belongsTo(User, { foreignKey: 'userId' });

module.exports = Expenditure;
