'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    expense () {
        return this.hasOne('App/Models/Expense')
    }
}

module.exports = Category
