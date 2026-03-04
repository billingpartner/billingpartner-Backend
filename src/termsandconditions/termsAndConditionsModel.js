const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const TermsAndConditions = sequelize.define('TermsAndConditions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    termsandconditions: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'termsandconditions',
    timestamps: false
});

module.exports = TermsAndConditions;
