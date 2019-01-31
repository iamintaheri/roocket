'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Section extends Model {
    video()
    {
        return this.belongsTo('App/Model/Video')
    }
}

module.exports = Section
