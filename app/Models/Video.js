'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Video extends Model {
    static get hidden()
    {
        return ['updated_at']
    }

    sections ()
    {
       return this.hasMany('App/Models/Section')
    }

    users()
    {
        return this.belongsToMany('App/Models/User').pivotTable('orders')
    }
}

module.exports = Video
